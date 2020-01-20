mysql -u tarryc -p myrv< myrv-db-dump-start.sql

mysqldump --extended-insert=FALSE --complete-insert=TRUE -u tarryc -ptarryc myrv > myrv-db-dump-start.sql
