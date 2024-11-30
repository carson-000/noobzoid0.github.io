window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    const fragment = window.location.hash.substring(1);
    console.log("Hash Fragment:", fragment);

    if (!fragment) {
        console.error("No hash fragment found.");
        return;
    }

    try {
        // Decode URL-encoded characters in the fragment
        const decodedFragment = decodeURIComponent(fragment);
        console.log("Decoded URL Fragment:", decodedFragment);

        const decodedText = atob(decodedFragment);
        console.log("Decoded Text:", decodedText);

        const jsonData = JSON.parse(decodedText);
        console.log("Parsed JSON Data:", jsonData);

        if (!jsonData['org_scoped_id']) {
            throw new Error("org-scoped-id not found in JSON");
        }

        const orgscoped = jsonData['org_scoped_id'];
        console.log("Org Scoped ID:", orgscoped);

        fetch(`https://account.noobzoid.xyz/login/${orgscoped}`)
    .then(response => {
        console.log("Fetch Response Status:", response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetch Response Data:", data);

        // Check if the account is banned in the response data
        if (data.error && data.error.status === "Forbidden" && data.error.error === "AccountBanned") {
            const banReasonKey = Object.keys(data.error.errorDetails)[0];
            const banReason = banReasonKey || "Unknown reason";
            const banTime = data.error.errorDetails[banReason][0];
            
            const banDiv = document.getElementById('banned');
            banDiv.classList.remove('visually-hidden'); // Show ban message

            const formattedBanTime = new Date(banTime).toLocaleString();
            alert(`Account is banned.\nReason: ${banReason}\nUnban Time: ${formattedBanTime} UTC`);
        } else {
            SetItems(data);
            
            const loading = document.getElementById('loading');
            loading.classList.add('visually-hidden'); // Hide loading icon
            
            const parent = document.getElementById('parent-container');
            parent.classList.remove('visually-hidden'); // Show the parent container
        }
    })
    .catch(error => {
        console.error("Error fetching the URL:", error);

        // Optionally hide the loading icon in case of an error
        const loading = document.getElementById('loading');
        loading.classList.add('visually-hidden');
    });
    } catch (error) {
        console.error("Error decoding Base64 fragment:", error);
    }
});

function SetItems(data) {
    const createdDate = new Date(data.Created);
    const lastLoginDate = new Date(data.lastLogin);
    const username = data.DisplayName;

    // Format the date
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZoneName: 'short' // Optional: includes time zone
    };
    
    const formattedDate = createdDate.toLocaleString('en-US', options);
    const formattedDate2 = createdDate.toLocaleString('en-US', options); // Format date to readable string

    document.getElementById("createdAt").innerHTML = `<p>First Login: ${formattedDate}</p>`;
    
    document.getElementById("lastLogin").innerHTML = `<p>Last Login: ${formattedDate2}</p>`;
    
    document.getElementById("displayName").innerHTML = `<p>Hello, ${username}!</p>`;
    
    console.log(data.CURRENCY);
}
