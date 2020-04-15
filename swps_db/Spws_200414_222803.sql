-- Coordinate [ent1]
create table `coordinate` (
   `oid`  integer  not null,
   `latitude`  decimal(19,2),
   `longitude`  decimal(19,2),
  primary key (`oid`)
);


-- Pedestrian [ent2]
create table `pedestrian` (
   `oid`  integer  not null,
   `name`  varchar(255),
   `email`  varchar(255),
   `password`  varchar(255),
  primary key (`oid`)
);


-- Vehicle [ent3]
create table `vehicle` (
   `oid`  integer  not null,
   `brand`  varchar(255),
   `model`  varchar(255),
   `license_plate`  varchar(255),
  primary key (`oid`)
);


-- Crosswalk [ent4]
create table `crosswalk` (
   `oid`  integer  not null,
   `address`  varchar(255),
   `state`  bit,
   `total_pedestrians`  decimal(19,2),
   `total_vehicles`  decimal(19,2),
  primary key (`oid`)
);


-- Coordinate_Crosswalk [rel2]
alter table `crosswalk`  add column  `coordinate_oid`  integer;
alter table `crosswalk`   add index fk_crosswalk_coordinate (`coordinate_oid`), add constraint fk_crosswalk_coordinate foreign key (`coordinate_oid`) references `coordinate` (`oid`);


-- Coordinate_Vehicle [rel3]
alter table `vehicle`  add column  `coordinate_oid`  integer;
alter table `vehicle`   add index fk_vehicle_coordinate (`coordinate_oid`), add constraint fk_vehicle_coordinate foreign key (`coordinate_oid`) references `coordinate` (`oid`);


-- Coordinate_Pedestrian [rel4]
alter table `pedestrian`  add column  `coordinate_oid`  integer;
alter table `pedestrian`   add index fk_pedestrian_coordinate (`coordinate_oid`), add constraint fk_pedestrian_coordinate foreign key (`coordinate_oid`) references `coordinate` (`oid`);


