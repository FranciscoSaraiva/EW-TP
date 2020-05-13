CREATE DEFINER=`root`@`localhost` TRIGGER `pedestrian_AFTER_INSERT` AFTER INSERT ON `pedestrian` FOR EACH ROW BEGIN
	DECLARE id_cross INT;
    DECLARE longitude_cross, latitude_cross DECIMAL(19,6);
    DECLARE longitude_ped, latitude_ped DECIMAL(19,6);
	
    DECLARE l1, l2 DECIMAL(19,6);
    
	DECLARE c1 CURSOR 
		FOR 
			SELECT crosswalk.oid, coordinate.longitude, coordinate.latitude 
            FROM crosswalk
            INNER JOIN coordinate
            ON crosswalk.coordinate_oid = coordinate.oid;
	
    OPEN c1;
			
	SELECT longitude, latitude
	INTO l1, l2
	FROM coordinate
	INNER JOIN pedestrian
	ON NEW.coordinate_oid = coordinate.oid;
            
    LOOP
		FETCH c1 INTO id_cross, longitude_cross, latitude_cross;
        
		#CALL calculate_pedestrians(id_cross, longitude_cross, latitude_cross, l1, l2);
	END LOOP;
		
	CLOSE c1;
    
END