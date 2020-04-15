CREATE DEFINER=`root`@`localhost` PROCEDURE `calculate_vehicles`(
	IN id_crosswalk INTEGER,
	IN longitude_cross DECIMAL,
    IN latitude_cross DECIMAL,
	IN longitude_veh DECIMAL,
    IN latitude_veh DECIMAL
    )
BEGIN
DECLARE distance float;
 
	SELECT ST_Distance_Sphere(
    point(longitude_cross, latitude_cross),
    point(longitude_veh, latitude_veh)
    ) 
    into distance;
    IF(distance <= 50) THEN 
		UPDATE crosswalk
		SET total_vehicles = total_vehicles+1
		WHERE id = id_crosswalk;
    END IF;
END