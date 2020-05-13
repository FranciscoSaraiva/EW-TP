-- Group [Group]
create table `group` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
);


-- Module [Module]
create table `module` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
);


-- User [User]
create table `user` (
   `oid`  integer  not null,
   `username`  varchar(255),
   `password`  varchar(255),
   `email`  varchar(255),
  primary key (`oid`)
);


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


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group`  add column  `module_oid`  integer;
alter table `group`   add index fk_group_module (`module_oid`), add constraint fk_group_module foreign key (`module_oid`) references `module` (`oid`);


-- Group_Module [Group2Module_Module2Group]
create table `group_module` (
   `group_oid`  integer not null,
   `module_oid`  integer not null,
  primary key (`group_oid`, `module_oid`)
);
alter table `group_module`   add index fk_group_module_group (`group_oid`), add constraint fk_group_module_group foreign key (`group_oid`) references `group` (`oid`);
alter table `group_module`   add index fk_group_module_module (`module_oid`), add constraint fk_group_module_module foreign key (`module_oid`) references `module` (`oid`);


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user`  add column  `group_oid`  integer;
alter table `user`   add index fk_user_group (`group_oid`), add constraint fk_user_group foreign key (`group_oid`) references `group` (`oid`);


-- User_Group [User2Group_Group2User]
create table `user_group` (
   `user_oid`  integer not null,
   `group_oid`  integer not null,
  primary key (`user_oid`, `group_oid`)
);
alter table `user_group`   add index fk_user_group_user (`user_oid`), add constraint fk_user_group_user foreign key (`user_oid`) references `user` (`oid`);
alter table `user_group`   add index fk_user_group_group (`group_oid`), add constraint fk_user_group_group foreign key (`group_oid`) references `group` (`oid`);


-- Coordinate_Crosswalk [rel2]
alter table `crosswalk`  add column  `coordinate_oid`  integer;
alter table `crosswalk`   add index fk_crosswalk_coordinate (`coordinate_oid`), add constraint fk_crosswalk_coordinate foreign key (`coordinate_oid`) references `coordinate` (`oid`);


-- Coordinate_Vehicle [rel3]
alter table `vehicle`  add column  `coordinate_oid`  integer;
alter table `vehicle`   add index fk_vehicle_coordinate (`coordinate_oid`), add constraint fk_vehicle_coordinate foreign key (`coordinate_oid`) references `coordinate` (`oid`);


-- Coordinate_Pedestrian [rel4]
alter table `pedestrian`  add column  `coordinate_oid`  integer;
alter table `pedestrian`   add index fk_pedestrian_coordinate (`coordinate_oid`), add constraint fk_pedestrian_coordinate foreign key (`coordinate_oid`) references `coordinate` (`oid`);


