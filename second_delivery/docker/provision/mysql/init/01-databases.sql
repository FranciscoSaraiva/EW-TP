CREATE SCHEMA `crosswalkdb`;
CREATE SCHEMA `pedestriandb`;
CREATE SCHEMA `vehicledb`;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '19mysql9727';
GRANT ALL ON *.* TO 'root'@'%';