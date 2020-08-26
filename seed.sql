USE employees;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("IT");
INSERT INTO department (name) VALUES ("HR");
INSERT INTO department (name) VALUES ("Engineering");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Person", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Mechanical Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Electrical Engineer", 85000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("HR Drone", 50000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("IT Mastermind", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Erin", "Plavoet", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tom", "Chalamee", 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Hojin", "M", 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Manoli", "Greek", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kyle", "Andie", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ed", "Gibbons", 2, 4);

