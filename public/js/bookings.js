//socket io
const socket = io();
socket.on("Transaction", (data) => {
  console.log(data);
  showNotification();
});

const updateBookingsLayout = (bookings) => {
  if (bookings.length === 0) {
    const noNotificationsDiv = document.createElement("div");
    noNotificationsDiv.classList.add("no-notifications");
    noNotificationsDiv.innerHTML = "<p>You have no notifications.</p>";
    document.getElementById("cardsContainer").appendChild(noNotificationsDiv);
  }
  const cardsContainer = document.getElementById("cardsContainer");
  let user = JSON.parse(sessionStorage.getItem("user"));

  bookings.forEach((item) => {
    if (!item.confirmed && user?.type == "WALKER") {
      const card = document.createElement("div");

      card.classList.add("card");

      const date = getDate(item.date);
      let user = null;

      // Create card content
      card.innerHTML = `
    <div class="card-title">${item.service} on ${date}</div>
    <div class="card-info">Owner Name: ${item.ownerName}</div>
    <div class="card-info">Date: ${date}</div>
    <div class="card-info">Time: ${item.time}</div>
    <div class="card-info">Location: ${item.address}</div>
    <div class="card-buttons">
        <button class="confirm-button" id="confirm"> <span class="material-icons">check_circle</span>Confirm</button>
        <button class="decline-button" id="decline"> <span class="material-icons">remove_circle</span>Decline</button>
    </div>
`;
      // Attach event listeners to buttons
      card
        .querySelector(".confirm-button")
        .addEventListener("click", () => handleConfirm(item, card));
      card
        .querySelector(".decline-button")
        .addEventListener("click", () => handleDecline(item, card));
      cardsContainer.appendChild(card);
    } else {
      if (user?.type == "OWNER") {
        addToHistory(item);
      } else if (
        user?.type == "WALKER" &&
        item.confirmed &&
        item.confirmation
      ) {
        addToHistory(item);
      }
    }
  });
};

const handleConfirm = (booking, cardElement) => {
  updateBookingConfirmation(1, booking._id, true);
  cardElement.remove();
  let notificateUserId = booking.ownerId;
  socket.emit("Transaction", { notificateUserId });
};

function handleDecline(booking, cardElement) {
  deleteBooking(booking._id);
  updateBookingConfirmation(1, booking._id, false);
  cardElement.remove();
}

const fetchAndDisplayBookings = (userId) => {
  $.ajax({
    url: `user/bookings/${userId}`,
    method: "GET",
    success: function (data) {
      updateBookingsLayout(data);
    },
    error: function (error) {
      console.error("Error fetching bookings:", error);
    },
  });
};

const updateBookingConfirmation = (userId, bookingId, confirmation) => {
  userId = window.location.search.replace("?", "").split("=")?.[1] || 1;
  $.ajax({
    url: `user/bookings/${userId}`,
    type: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      filter: { bookingId: bookingId },
      update: {
        confirmation: confirmation,
      },
    }),
    success: function (data) {
      if (confirmation) {
        addToHistory(data);
      }
    },
    error: function (error) {
      console.error("Error updating bookings:", error);
    },
  });
};

const deleteBooking = (bookingId) => {
  $.ajax({
    url: `/user/bookings/${bookingId}`,
    type: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data) {
      console.log("deleted");
    },
    error: function (error) {
      console.error("Error updating bookings:", error);
    },
  });
};

function addToHistory(item) {
  const historyContainer = document.getElementById("historyContainer");

  // Create a new history card element
  const historyCard = document.createElement("div");
  historyCard.classList.add("history");

  const time = item.time;
  const date = getDate(item.date);
  let user = null;
  //Todo: remove once the profile is merged
  let userObj = JSON.parse(sessionStorage.getItem("user"));
  if (userObj?.type == "OWNER") {
    user = `Sitter Name: ${item.sitterName}`;
  } else {
    user = `Owner Name: ${item.ownerName}`;
  }

  historyCard.innerHTML = `
    <div class="history-title"> <span class="material-icons">pets</span> ${
      item.service
    } on ${date}</div>
    <div class="card-info">${user}</div>
    <div class="card-info">Date: ${date}</div>
    <div class="card-info">Time: ${time}</div>
    <div class="card-info">Location: ${item.address}</div>
    ${
      userObj?.type === "OWNER"
        ? '<a href="review.html" class="review-button">Leave a Review</a>'
        : ``
    }
    ${
      item.confirmation && item.confirmed
        ? `<span class="confirmation-label">Confirmed</span>`
        : !item.confirmed && userObj?.type === "OWNER"
        ? `<span class="pending-label">Pending Confirmation</span>`
        : item.confirmed && userObj?.type === "OWNER"
        ? `<span class="pending-label">Rejected</span>`
        : ``
    }
`;

  // Append the new history card to the history container
  historyContainer.appendChild(historyCard);
}

const convertTo24Hour = (datetimeStr) => {
  // Create a Date object from the ISO string
  const dateObj = new Date(datetimeStr);

  // Extract date in the format YYYY-MM-DD
  const datePart = dateObj.toISOString().split("T")[0];

  // Extract time in the format HH:MM (and optionally AM/PM)
  let timePart = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return timePart;
};

const getDate = (dateTimeStr) => {
  const dateObj = new Date(dateTimeStr);
  const datePart = dateObj.toISOString().split("T")[0];
  return datePart;
};

const showNotification = () => {
  var notification = document.getElementById("notification");
  notification.classList.add("show");

  // Hide the notification after 50 seconds
  setTimeout(function () {
    notification.classList.remove("show");
  }, 500000);
};

const closeNotification = () => {
  var notification = document.getElementById("notification");
  notification.classList.remove("show");
};

$(document).ready(() => {
  let userId = window.location.search.replace("?", "").split("=")?.[1] || 1;

  fetchAndDisplayBookings(userId);
});
