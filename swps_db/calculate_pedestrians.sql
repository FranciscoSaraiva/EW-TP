CREATE DEFINER=`root`@`localhost` PROCEDURE `calculate_pedestrians`(
	IN id_crosswalk INTEGER,
	IN longitude_cross DECIMAL,
    IN latitude_cross DECIMAL,
	IN longitude_ped DECIMAL,
    IN latitude_ped DECIMAL
    )
BEGIN
DECLARE distance float;
 
	SELECT ST_Distance_Sphere(
    point(longitude_cross, latitude_cross),
    point(longitude_ped, latitude_ped)
    ) 
    into distance;
    IF(distance <= 20) THEN 
		UPDATE crosswalk
		SET total_pedestrians = total_pedestrians+1
		WHERE id = id_crosswalk;
    END IF;
END