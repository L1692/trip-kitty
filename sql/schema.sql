CREATE TABLE viaggio (
    id int unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) UNIQUE NOT NULL,
    data_inizio DATE NOT NULL,
    data_fine DATE NOT NULL,
    destinazione VARCHAR(255) NOT NULL,
    valuta CHAR(3) NOT NULL DEFAULT 'EUR',
    creato_il TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_date CHECK (data_fine >= data_inizio)
);

INSERT INTO viaggio (nome, data_inizio, data_fine, destinazione, valuta) VALUES
('Vacanza al mare', '2024-07-01', '2024-07-15', 'Sardegna', 'EUR'),
('Viaggio in montagna', '2024-08-10', '2024-08-20', 'Dolomiti', 'EUR'),
('Tour culturale', '2024-09-05', '2024-09-12', 'Roma', 'EUR');