document
  .getElementById("searchdogsitter")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const location = document.getElementById("searchLocation").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<p>Loading...</p>"; // Show loading indicator

    try {
      const response = await fetch(
        `/api/search?location=${encodeURIComponent(location)}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const results = await response.json();

      if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
      } else {
        resultsDiv.innerHTML = results
          .map(
            (result) => `
                <div class="card">
                    <h5 style="padding:2%">${result.firstName} ${result.lastName}</h5>
                    <p style="margin: 0">${result.address}, ${result.suburb}, ${result.postalCode}</p>
                    <p style="margin: 0">Email: ${result.email}</p>
                    <p >Phone: ${result.phone}</p>
                    <button class="contact-button" data-id="${result._id}">Contact</button>
                </div>
            `
          )
          .join("");

        // Add event listeners to each contact button
        const contactButtons = resultsDiv.querySelectorAll(".contact-button");
        contactButtons.forEach((button, index) => {
          button.addEventListener("click", () =>
            contactWalker(results[index], location)
          );
        });
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
      resultsDiv.innerHTML =
        "<p>An error occurred while fetching results. Please try again later.</p>";
    }
  });

const contactWalker = (result, location) => {
  localStorage.setItem("selectedSitter", JSON.stringify(result));
  localStorage.setItem("location", JSON.stringify(location));
  window.location.href = "./walkerProfile.html";
};
