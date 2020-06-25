-- drop table admins;
-- drop table tax_payer;
-- drop table gross_income;
-- drop table tax;

create table admins(
    id int NOT NULL AUTO_INCREMENT,
    username varchar(50),
    password varchar(1000),
    primary key(id)
);


create table tax_payer(
    person_id int NOT NULL AUTO_INCREMENT,
    f_name varchar(30),
    l_name varchar(30),
    email varchar(30),
    password varchar(10000),
    dob varchar(30),
    aadhar_no varchar(50),
    mobile varchar(20),
    noe varchar(20),
    addr_1 varchar(100),
    addr_2 varchar(100),
    city varchar(50),
    state varchar(50),
    pincode int(10),
    primary key(person_id)
);

create table gross_income(
    person_id  INT,
    ann_inc INT,
    house_inc INT,
    other INT,
    PRIMARY KEY(person_id),
    FOREIGN KEY (person_id) REFERENCES tax_payer(person_id)
);

create table tax(
    tax_id INT NOT NULL AUTO_INCREMENT,
    person_id INT,
    tax_amt INT,
    ITR_date varchar(20),
    ann_tot_inc INT,
    tax_per varchar(5),
    inc_afr_tax INT,
    primary key(tax_id)
);

