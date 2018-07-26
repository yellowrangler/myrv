USE myrv;

DROP TABLE membertbl;
CREATE TABLE membertbl (
    ID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    email varchar(100) NULL,
    password varchar(100) NULL,
    status varchar(100) NULL,
    membername varchar(100) NULL,
    screenname varchar(100) NULL,
    phone varchar(100) NULL,
    address varchar(100) NULL,
    city varchar(100) NULL,
    state varchar(100) NULL,
    zipcode varchar(100) NULL,
    avatar varchar(255) NULL,
    token varchar(100) NULL,
    role varchar(100) NULL,
    biography varchar(10000) DEFAULT NULL,
    lastupdate datetime DEFAULT NULL,
    PRIMARY KEY (ID)
);

DROP TABLE triptbl;
CREATE TABLE triptbl (
    ID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    memberid varchar(100) DEFAULT NULL,
    name VARCHAR(256) DEFAULT NULL,
    currenttrip	VARCHAR(2) DEFAULT NULL,
    startodometer DECIMAL(18,1),
    endodometer	DECIMAL(18,1),
    startdate DATETIME DEFAULT NULL,
    startlocation VARCHAR(256) DEFAULT NULL,
    endlocation	VARCHAR(256) DEFAULT NULL,
    enddate	DATETIME DEFAULT NULL,
    lastupdate DATETIME DEFAULT NULL,
    PRIMARY KEY (ID)
);
