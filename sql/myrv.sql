USE myrv;

DROP TABLE membertbl;
CREATE TABLE membertbl (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    email varchar(100) NULL,
    password varchar(100) NULL,
    status varchar(100) NULL,
    membername varchar(100) NULL,
    screenname varchar(100) NULL,
    phonenumber varchar(100) NULL,
    address varchar(100) NULL,
    city varchar(100) NULL,
    state varchar(100) NULL,
    zipcode varchar(100) NULL,
    avatar varchar(255) NULL,
    gender varchar(100) NULL,
    token varchar(100) NULL,
    role varchar(100) NULL,
    biography varchar(10000) DEFAULT NULL,
    membernameprofileind int(11) DEFAULT NULL,
    genderprofileind int(11) DEFAULT NULL,
    emailprofileind int(11) DEFAULT NULL,
    addressprofileind int(11) DEFAULT NULL,
    phonenumberprofileind int(11) DEFAULT NULL,
    noemail int(11) DEFAULT NULL,
    biographyprofileind int(11) DEFAULT NULL,
    lastupdate datetime DEFAULT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE membertbl
ADD COLUMN membernameprofileind int(11) DEFAULT NULL AFTER biography,
ADD COLUMN genderprofileind int(11) DEFAULT NULL AFTER membernameprofileind,
ADD COLUMN emailprofileind int(11) DEFAULT NULL AFTER genderprofileind,
ADD COLUMN addressprofileind int(11) DEFAULT NULL AFTER emailprofileind,
ADD COLUMN phonenumberprofileind int(11) DEFAULT NULL AFTER addressprofileind,
ADD COLUMN noemail int(11) DEFAULT NULL AFTER phonenumberprofileind,
ADD COLUMN biographyprofileind int(11) DEFAULT NULL AFTER noemail;


DROP TABLE triptbl;
CREATE TABLE triptbl (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    memberid varchar(100) DEFAULT NULL,
    tripname VARCHAR(256) DEFAULT NULL,
    currenttrip	VARCHAR(2) DEFAULT NULL,
    startodometer VARCHAR(256) DEFAULT NULL,
    startdate VARCHAR(256) DEFAULT NULL,
    startlocation VARCHAR(256) DEFAULT NULL,
    startlatitude VARCHAR(256) DEFAULT NULL,
    startlongitude VARCHAR(256) DEFAULT NULL,
    endodometer VARCHAR(256) DEFAULT NULL,
    endlocation	VARCHAR(256) DEFAULT NULL,
    endlatitude VARCHAR(256) DEFAULT NULL,
    endlongitude VARCHAR(256) DEFAULT NULL,
    enddate	VARCHAR(256) DEFAULT NULL,
    lastupdate DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);

-- TEST DATA

INSERT INTO triptbl(id, memberid, tripname, currenttrip, startodometer, startdate, startlocation, 
    startlatitude, startlongitude, endodometer, endlocation, endlatitude, endlongitude, enddate) VALUES 
(1,1,"Spring 2017", "Y", "320,000", "2017-04-04 00:00:00", "Orleans, MA", "","","??","","","Manchester, MA","2017-05-04 00:00:00"),
(2,1,"Fall 2017", "Y", "330,000", "2017-08-04 00:00:00", "Orleans, MA", "","","??","","","Manchester, MA","2017-09-04 00:00:00"),
(3,1,"Winter 2017", "Y", "340,000", "2017-10-04 00:00:00", "Orleans, MA", "","","??","","","Manchester, MA","2017-12-04 00:00:00"),
(4,1,"Spring 2018", "Y", "350,000", "2018-03-04 00:00:00", "Orleans, MA", "","","??","","","Manchester, MA","2018-04-04 00:00:00"),
(5,1,"Summer 2018", "Y", "360,000", "2018-07-04 00:00:00", "Orleans, MA", "","","??","","","Manchester, MA","2018-08-04 00:00:00");


DROP TABLE tripwaypointstbl;
CREATE TABLE tripwaypointstbl (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    memberid bigint(20) unsigned DEFAULT NULL,
    tripid bigint(20) unsigned DEFAULT NULL,
    sequencenumber bigint(20) unsigned DEFAULT NULL,
    waypointname VARCHAR(256) DEFAULT NULL,
    waypointlocation VARCHAR(1000) DEFAULT NULL,
    type VARCHAR(256) DEFAULT NULL,
    address varchar(100) NULL,
    city varchar(100) NULL,
    state varchar(100) NULL,
    estimatedmiles VARCHAR(100) DEFAULT NULL,
    latitude VARCHAR(256) DEFAULT NULL,
    longitude VARCHAR(256) DEFAULT NULL,
    waypointdate VARCHAR(256) DEFAULT NULL,
    duration VARCHAR(256) DEFAULT NULL,
    comments VARCHAR(1000) DEFAULT NULL,
    lastupdate DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);

-- TEST DATA

INSERT INTO tripwaypointstbl(id, memberid, tripid, sequencenumber, waypointname, type, address, city, state, 
    estimatedmiles, latitude, longitude, waypointdate, duration, comments) VALUES 
(1,1,1,1,"Walmart","","Address","Harrisburg","PA","300","","","2017-04-04 00:00:00","1 day","Great people"),
(2,1,1,2,"Walmart","","Address","Norfolk","VA","300","","","2017-04-08 00:00:00","1 day","Scary Place"),
(3,1,1,3,"Oscar Shire","","Address","Sarrasotta","FL","600","","","2017-04-10 00:00:00","5 days","Great Place");


DROP TABLE vechiletbl;
CREATE TABLE vechiletbl (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    memberid bigint(20) unsigned DEFAULT NULL,
    vehicletype VARCHAR(256) DEFAULT NULL,
    make VARCHAR(256) DEFAULT NULL,
    model VARCHAR(256) DEFAULT NULL,
    color VARCHAR(256) DEFAULT NULL,
    year VARCHAR(256) DEFAULT NULL,
    platenbr VARCHAR(256) DEFAULT NULL,
    platestate VARCHAR(256) DEFAULT NULL,
    VIN VARCHAR(256) DEFAULT NULL,
    tiresize VARCHAR(256) DEFAULT NULL,
    tirenumber  VARCHAR(256) DEFAULT NULL,
    length VARCHAR(256) DEFAULT NULL,
    comments VARCHAR(1000) DEFAULT NULL,
    status VARCHAR(256) DEFAULT NULL,
    lastupdate datetime DEFAULT NULL,
    PRIMARY KEY (id)
);


-- Never use stuff under this comments


UPDATE triptbl SET 
    memberid=[value-2],
    tripname=[value-3],
    currenttrip=[value-4],
    startodometer=[value-5],
    startdate=[value-6],
    startlocation=[value-7],
    startlatitude=[value-8],
    startlongitude=[value-9],
    endodometer=[value-10],
    endlocation=[value-11],
    endlatitude=[value-12],
    endlongitude=[value-13],
    enddate=[value-14],
    lastupdate=[value-15] 
WHERE memberid = $memberid AND tripid = $tripid

INSERT INTO triptbl(id, memberid, tripname, currenttrip, startodometer, startdate, startlocation, 
    startlatitude, startlongitude, endodometer, endlocation, endlatitude, endlongitude, enddate, lastupdate) 
    VALUES 
    ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],
     [value-9],[value-10],[value-11],[value-12],[value-13],[value-14],[value-15])


INSERT INTO tripwaypointstbl(id, memberid, tripid, sequencenumber, waypointname, type, 
    address, city, state, estimatedmiles, latitude, longitude, waypointdate, duration, comments, lastupdate) 
    VALUES  ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9],
            [value-10],[value-11],[value-12],[value-13],[value-14],[value-15],[value-16])        

UPDATE tripwaypointstbl 
SET id=[value-1]
memberid=[value-2],
tripid=[value-3],
sequencenumber=[value-4],
waypointname=[value-5],
type=[value-6],
address=[value-7],
city=[value-8],
state=[value-9],
estimatedmiles=[value-10],
latitude=[value-11],
longitude=[value-12],
waypointdate=[value-13],
duration=[value-14],
comments=[value-15],
lastupdate=[value-16] WHERE 1














