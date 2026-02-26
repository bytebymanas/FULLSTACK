// 1. Mock Data: Array of Job Objects
const jobs = [
    {
        id: 1,
        title: "Web Developer",
        company: "Tech Solutions Pvt Ltd",
        exp: "0-2 Yrs",
        location: "Pune",
        desc: "Looking for a basic HTML/CSS developer. Good knowledge of Javascript is a plus.",
        isHot: true
    },
    {
        id: 2,
        title: "Sales Executive",
        company: "Market Masters",
        exp: "1-3 Yrs",
        location: "Delhi",
        desc: "Field sales requirement. Must have good communication skills.",
        isHot: false
    },
    {
        id: 3,
        title: "Data Entry Operator",
        company: "Global Services",
        exp: "Fresher",
        location: "Remote",
        desc: "Urgent hiring for data entry. Typing speed should be 30 wpm.",
        isHot: false
    },
    {
        id: 4,
        title: "Frontend Engineer",
        company: "Innovate Web",
        exp: "2-5 Yrs",
        location: "Bangalore",
        desc: "React.js expert needed for a fast-paced startup environment.",
        isHot: true
    },
    {
        id: 5,
        title: "Marketing Manager",
        company: "Growth Hackers",
        exp: "4-7 Yrs",
        location: "Mumbai",
        desc: "Lead the digital marketing team for global brand campaigns.",
        isHot: false
    }
];

// 2. DOM Elements
const jobContainer = document.getElementById('jobContainer');
const skillInput = document.getElementById('skillInput');
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const resultTitle = document.getElementById('resultTitle');

// 3. Function to Render Jobs
function displayJobs(filteredJobs) {
    jobContainer.innerHTML = ""; // Clear current list

    if (filteredJobs.length === 0) {
        jobContainer.innerHTML = `<div class="no-results"><h3>No jobs found matching your criteria.</h3></div>`;
        return;
    }

    filteredJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        
        jobCard.innerHTML = `
            <h3>${job.title} ${job.isHot ? '<span style="font-size: 12px; color: red;">(Hot)</span>' : ''}</h3>
            <p class="company">${job.company}</p>
            <p class="details">
                <span>Experience: ${job.exp}</span> | 
                <span>Location: ${job.location}</span>
            </p>
            <p class="desc">${job.desc}</p>
            <button class="apply-btn">Apply Now</button>
        `;
        jobContainer.appendChild(jobCard);
    });
}

// 4. Search Logic
function handleSearch() {
    const skillValue = skillInput.value.toLowerCase();
    const locationValue = locationInput.value.toLowerCase();

    const filtered = jobs.filter(job => {
        const matchesSkill = job.title.toLowerCase().includes(skillValue) || 
                             job.desc.toLowerCase().includes(skillValue);
        const matchesLocation = job.location.toLowerCase().includes(locationValue);
        
        return matchesSkill && matchesLocation;
    });

    resultTitle.innerText = `Search Results (${filtered.length})`;
    displayJobs(filtered);
}

// 5. Event Listeners
searchBtn.addEventListener('click', handleSearch);

// Allow pressing "Enter" key to search
[skillInput, locationInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
});

// Initial Load
displayJobs(jobs);