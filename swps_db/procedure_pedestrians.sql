CREATE DEFINER=`root`@`localhost` PROCEDURE `calculate_pedestrians`(
	IN id_crosswalk INTEGER,
	IN longitude_cross DECIMAL,
    IN latitude_cross DECIMAL,
	IN longitude_ped DECIMAL,
    IN latitude_ped DECIMAL
    )
BEGIN
DECLARE distance float;
 
	SELECT ST_DISTANCE_SPHERE(
		POINT(longitude_cross, latitude_cross),
		POINT(longitude_ped, latitude_ped))
	INTO distance;
    
    IF(distance <= 20) THEN 
		UPDATE crosswalk
		SET total_pedestrians = total_pedestrians+1
		WHERE oid = id_crosswalk;
    END IF;

END