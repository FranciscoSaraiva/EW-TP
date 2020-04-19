CREATE PROCEDURE `calculate_vehicles` (
IN id_crosswalk INTEGER,
	IN longitude_cross DECIMAL,
    IN latitude_cross DECIMAL,
	IN longitude_veh DECIMAL,
    IN latitude_veh DECIMAL
    )
BEGIN
DECLARE distance float;
 
	SELECT ST_DISTANCE_SPHERE(
		POINT(longitude_cross, latitude_cross),
		POINT(longitude_veh, latitude_veh))
	INTO distance;
    
    IF(distance <= 50) THEN 
		UPDATE crosswalk
		SET total_vehicles = total_vehicles + 1
		WHERE oid = id_crosswalk;
    END IF;
    
END
