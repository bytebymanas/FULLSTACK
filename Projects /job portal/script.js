// 1. Initialize Data (Load from LocalStorage or use defaults)
let jobs = JSON.parse(localStorage.getItem('naukriJobs')) || [
    { id: 1, title: "Web Developer", company: "Tech Solutions", exp: "0-2 Yrs", location: "Pune", desc: "HTML/CSS expert needed." },
    { id: 2, title: "Sales Executive", company: "Market Masters", exp: "1-3 Yrs", location: "Delhi", desc: "Field sales role." }
];

// 2. Navigation Logic
function showSection(section) {
    document.getElementById('searchView').style.display = section === 'search' ? 'block' : 'none';
    document.getElementById('adminView').style.display = section === 'admin' ? 'block' : 'none';
    if(section === 'admin') renderAdminTable();
    else renderJobs(jobs);
}

// 3. Render Jobs for Users
function renderJobs(data) {
    const container = document.getElementById('jobContainer');
    container.innerHTML = data.map(job => `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <p class="details">Exp: ${job.exp} | Loc: ${job.location}</p>
            <p class="desc">${job.desc}</p>
            <button class="apply-btn">Apply Now</button>
        </div>
    `).join('') || '<p>No jobs found.</p>';
}

// 4. Admin Table CRUD
function renderAdminTable() {
    const tableBody = document.getElementById('adminTableBody');
    tableBody.innerHTML = jobs.map(job => `
        <tr>
            <td>${job.title}</td>
            <td>${job.company}</td>
            <td>${job.location}</td>
            <td>
                <button class="edit-btn" onclick="openModal(${job.id})">Edit</button>
                <button class="delete-btn" onclick="deleteJob(${job.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// 5. Save/Update Job
function saveJob() {
    const id = document.getElementById('jobId').value;
    const newJob = {
        id: id ? parseInt(id) : Date.now(),
        title: document.getElementById('formTitle').value,
        company: document.getElementById('formCompany').value,
        location: document.getElementById('formLocation').value,
        exp: document.getElementById('formExp').value,
        desc: document.getElementById('formDesc').value
    };

    if(id) {
        // Update
        const index = jobs.findIndex(j => j.id == id);
        jobs[index] = newJob;
    } else {
        // Create
        jobs.push(newJob);
    }

    localStorage.setItem('naukriJobs', JSON.stringify(jobs));
    closeModal();
    renderAdminTable();
}

// 6. Delete Job
function deleteJob(id) {
    if(confirm("Are you sure you want to delete this job?")) {
        jobs = jobs.filter(job => job.id !== id);
        localStorage.setItem('naukriJobs', JSON.stringify(jobs));
        renderAdminTable();
    }
}

// 7. Modal Logic
function openModal(id = null) {
    const modal = document.getElementById('jobModal');
    const title = document.getElementById('modalTitle');
    modal.style.display = "block";

    if(id) {
        title.innerText = "Edit Job";
        const job = jobs.find(j => j.id === id);
        document.getElementById('jobId').value = job.id;
        document.getElementById('formTitle').value = job.title;
        document.getElementById('formCompany').value = job.company;
        document.getElementById('formLocation').value = job.location;
        document.getElementById('formExp').value = job.exp;
        document.getElementById('formDesc').value = job.desc;
    } else {
        title.innerText = "Post New Job";
        document.getElementById('jobId').value = "";
        document.querySelectorAll('.modal-content input, textarea').forEach(i => i.value = "");
    }
}

function closeModal() {
    document.getElementById('jobModal').style.display = "none";
}

// 8. Search Logic
document.getElementById('searchBtn').addEventListener('click', () => {
    const skill = document.getElementById('skillInput').value.toLowerCase();
    const loc = document.getElementById('locationInput').value.toLowerCase();
    
    const filtered = jobs.filter(j => 
        (j.title.toLowerCase().includes(skill) || j.desc.toLowerCase().includes(skill)) &&
        j.location.toLowerCase().includes(loc)
    );
    renderJobs(filtered);
});

// Initial Load
renderJobs(jobs);