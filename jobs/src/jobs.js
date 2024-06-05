import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [job, setJob] = useState(null);
  const [newJob, setNewJob] = useState({
    job: "",
    company: "",
    city: "",
    country: "",
    category: "",
    pay: "",
    workinghours: "",
    office: false,
    remote: false,
  });
  const [deleteJobId, setDeleteJobId] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const fetchJobs = () => {
    axios
      .get("http://localhost:3050/api/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error(
          "Prišlo je do napake pri pridobivanju delovnih mest!",
          error
        );
      });
  };

  const fetchJobById = (id) => {
    axios
      .get(`http://localhost:3050/api/jobs/${id}`)
      .then((response) => {
        setJob(response.data);
        setShowOptions(false);
      })
      .catch((error) => {
        console.error(
          "Prišlo je do napake pri pridobivanju delovnega mesta!",
          error
        );
      });
  };

  const postJob = () => {
    axios
      .post("http://localhost:3050/api/jobs", newJob)
      .then((response) => {
        fetchJobs();
        setShowOptions(false);
        alert("Delovno mesto uspešno dodano!");
      })
      .catch((error) => {
        console.error(
          "Prišlo je do napake pri dodajanju delovnega mesta!",
          error
        );
      });
  };

  const deleteJob = (id) => {
    axios
      .delete(`http://localhost:3050/api/jobs/${id}`)
      .then((response) => {
        fetchJobs();
        setShowOptions(false);
        alert("Delovno mesto uspešno izbrisano!");
      })
      .catch((error) => {
        console.error(
          "Prišlo je do napake pri brisanju delovnega mesta!",
          error
        );
      });
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="microfrontend jobs-container">
      <h1>Seznam delovnih mest</h1>
      <button onClick={toggleOptions}>
        {showOptions ? "Skrij možnosti" : "Prikaži možnosti"}
      </button>
      {showOptions && (
        <div className="options">
          <button onClick={fetchJobs}>Pridobi vsa delovna mesta</button>
          <h2>Najdi delovno mesto po ID</h2>
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="Vnesite ID delovnega mesta"
          />
          <button onClick={() => fetchJobById(jobId)}>
            Najdi delovno mesto
          </button>
          {job && (
            <div>
              <h3>{job.job}</h3>
              <p>{job.company}</p>
              <p>{job.city}</p>
              <p>{job.country}</p>
              <p>{job.category}</p>
              <p>{job.pay}</p>
              <p>{job.workinghours}</p>
              <p>{job.office ? "Pisarniško delo" : "Delo na daljavo"}</p>
            </div>
          )}
          <h2>Dodaj delovno mesto</h2>
          <input
            type="text"
            value={newJob.job}
            onChange={(e) => setNewJob({ ...newJob, job: e.target.value })}
            placeholder="Naziv delovnega mesta"
          />
          <input
            type="text"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            placeholder="Podjetje"
          />
          <input
            type="text"
            value={newJob.city}
            onChange={(e) => setNewJob({ ...newJob, city: e.target.value })}
            placeholder="Mesto"
          />
          <input
            type="text"
            value={newJob.country}
            onChange={(e) => setNewJob({ ...newJob, country: e.target.value })}
            placeholder="Država"
          />
          <input
            type="text"
            value={newJob.category}
            onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
            placeholder="Kategorija"
          />
          <input
            type="number"
            value={newJob.pay}
            onChange={(e) => setNewJob({ ...newJob, pay: e.target.value })}
            placeholder="Plača"
          />
          <input
            type="text"
            value={newJob.workinghours}
            onChange={(e) =>
              setNewJob({ ...newJob, workinghours: e.target.value })
            }
            placeholder="Delovni čas"
          />
          <label>
            <input
              type="checkbox"
              checked={newJob.office}
              onChange={(e) =>
                setNewJob({ ...newJob, office: e.target.checked })
              }
            />
            Pisarniško delo
          </label>
          <label>
            <input
              type="checkbox"
              checked={newJob.remote}
              onChange={(e) =>
                setNewJob({ ...newJob, remote: e.target.checked })
              }
            />
            Delo na daljavo
          </label>
          <button onClick={postJob}>Dodaj delovno mesto</button>

          <h2>Izbriši delovno mesto po ID</h2>
          <input
            type="text"
            value={deleteJobId}
            onChange={(e) => setDeleteJobId(e.target.value)}
            placeholder="Vnesite ID delovnega mesta"
          />
          <button onClick={() => deleteJob(deleteJobId)}>
            Izbriši delovno mesto
          </button>
        </div>
      )}
    </div>
  );
}

export default Jobs;
