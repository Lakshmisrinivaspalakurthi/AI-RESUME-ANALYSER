CREATE TABLE analyses (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    ats_score FLOAT,
    job_readiness FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
