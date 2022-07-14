-- Create tables for raw data to be loaded into database

CREATE TABLE sample (
id INT PRIMARY KEY,
Name TEXT,
Club TEXT,
Nationality TEXT,
Position Text,
Age Integer,
Matches Integer,
Starts Integer,
Mins Integer,
Goals Integer,
Assists Integer,
Passes_Attempted Integer,
Perc_Passes_Completed NUMERIC,
Penalty_Goals Integer,
Penalty_Attempted Integer,
Yellow_Cards Integer,
Red_Cards Integer
coordinates Integer
);
select * from sample;


DROP TABLE Team_stats;
CREATE TABLE Team_stats (
id INT PRIMARY KEY,
Row_Labels  TEXT,
Goals Integer,
Assists Integer,
Perc_Passes_Completed  NUMERIC,
Penalty_Goals Integer,
Yellow_Cards Integer,
REd_Cards Integer
);
select * from Team_stats;


CREATE TABLE Top10Assists (
id INT PRIMARY KEY,
Name TEXT,
Assists Integer);
select * from Top10Assists;



CREATE TABLE Top10goals (
id INT PRIMARY KEY,
Name TEXT,
Goals Integer);
select * from Top10goals;


CREATE TABLE Top10passes (
id INT PRIMARY KEY,
Name TEXT,
Passes_Attempted Integer);
select * from Top10passes;