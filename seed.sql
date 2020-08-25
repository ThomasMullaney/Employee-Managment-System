USE employees;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("IT");
INSERT INTO department (name) VALUES ("HR");
INSERT INTO department (name) VALUES ("Engineering");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Person", 100000, 1),
    ("Mechanical Engineer", 120000, 2),
    ("Software Engineer", 150000, 2),
    ("Electrical Engineer", 85000, 2),
    ("HR Drone", 50000, 3),
    ("IT Mastermind", 70000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Erin", "Plavoet", 1, 1),
    ("Tom", "Chalamee", 4, NULL),
    ("Hojin", "M", 4, NULL),
    ("Manoli", "Greek", 4, 2),
    ("Kyle", "Andie", 3, 3),
    ("Ed", "Gibbons", 2, 4);

