drop table if exists Profile;
drop table if exists Rassylka;
drop table if exists Sklad;
drop table if exists Slider;
drop table if exists Zakaz_Product;
drop table if exists Zakaz;
drop table if exists Product;
drop table if exists Podcategory;
drop table if exists Akzii;
drop table if exists Sposob_Oplaty;
drop table if exists Izdatel;
drop table if exists Category;

drop procedure if exists Category_Insert;
drop procedure if exists Izdatel_Insert;
drop procedure if exists Sposob_Oplaty_Insert;
drop procedure if exists Akzii_Insert;
drop procedure if exists Podcategory_Insert;
drop procedure if exists Product_Insert;
drop procedure if exists Zakaz_Insert;
drop procedure if exists Zakaz_Product_Insert;
drop procedure if exists Slider_Insert;
drop procedure if exists Sklad_Insert;
drop procedure if exists Rassylka_Insert;
drop procedure if exists Profile_Insert;

drop procedure if exists Category_Update;
drop procedure if exists Izdatel_Update;
drop procedure if exists Sposob_Oplaty_Update;
drop procedure if exists Akzii_Update;
drop procedure if exists Podcategory_Update;
drop procedure if exists Product_Update;
drop procedure if exists Zakaz_Update;
drop procedure if exists Zakaz_Product_Update;
drop procedure if exists Slider_Update;
drop procedure if exists Sklad_Update;
drop procedure if exists Rassylka_Update;
drop procedure if exists Profile_Update;

drop procedure if exists Product_Set_Skidka;
drop procedure if exists Sklad_Add_Prodano;
drop procedure if exists Sklad_Add_Nalichie;
drop procedure if exists Sklad_Sub_Nalichie;





create table Category(
	ID_Category serial not null constraint PK_Category primary key,
	Name_Category varchar(50) not null constraint UQ_Name_Category unique
);
create table Izdatel(
	ID_Izdatel serial not null constraint PK_Izdatel primary key,
	Name_Izdatel varchar(50) not null constraint UQ_Name_Izdatel unique
);
create table Sposob_Oplaty(
	ID_Sposob_Oplaty serial not null constraint PK_Sposob_Oplaty primary key,
	Name_Sposob_Oplaty varchar(50) not null constraint UQ_Name_Sposob_Oplaty unique
);
create table Akzii(
	ID_Akzii serial not null constraint PK_Akzii primary key,
	Name_Akzii varchar(50) not null constraint UQ_Name_Akzii unique
);
create table Podcategory(
	ID_Podcategory serial not null constraint PK_Podcategory primary key,
	Name_Podcategory varchar(50) not null constraint UQ_Name_Podcategory unique,
	Category_ID int not null references Category (ID_Category)
);
create table Product(
	ID_Product serial not null constraint PK_Product primary key,
	Name_Product varchar(50) not null constraint UQ_Product unique,
	Izdatel_ID int not null references Izdatel (ID_Izdatel),
	Date_Vypusk_Product date not null,
	Category_ID int not null references Category (ID_Category),
	Podcategory_ID int not null references Podcategory (ID_Podcategory),
	Min_Igrok_Product int null,
	Vozrast_Ogranich_Product int null constraint CH_Vozrast_Ogranich_Product check (Vozrast_Ogranich_Product >=0 and Vozrast_Ogranich_Product < 100),
	Opisanie_Product varchar null,
	Price_Product int not null,
	Vremya_Igry_Product int null constraint CH_Vremya_Igry_Product check (Vremya_Igry_Product >= 0 and Vremya_Igry_Product < 1440), 
	Skidka_Product int null constraint CH_Skidka_Product check (Skidka_Product >= 0 and Skidka_Product < 100) default 0,
	image_product varchar not null
);
create table Zakaz(
	ID_Zakaz serial not null constraint PK_Zakaz primary key,
	First_Name_Zakaz varchar(50) not null,
	Last_Name_Zakaz varchar(50) not null,
	Email_Zakaz varchar(320) not null constraint CH_Email_Zakaz check (Email_Zakaz similar to '%@%.%'),
	Phone_Zakaz  varchar(16) not null constraint CH_Phone_Zakaz check (Phone_Zakaz similar to '+[8-9]\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}'),
	Date_Zakaz date not null,
	Itog_Stoimost_Zakaz int not null constraint CH_Itog_Stoimost_Zakaz check (Itog_Stoimost_Zakaz > 0),
	Akzii_ID int null references Akzii (ID_Akzii),
	Adress_Zakaz varchar(200) not null,
	Sposob_Oplaty_ID int not null references Sposob_Oplaty (ID_Sposob_Oplaty)
);
create table Zakaz_Product(
	ID_Zakaz_Product serial not null constraint PR_Zakaz_Product primary key,
	Zakaz_ID int not null references Zakaz (ID_Zakaz),
	Product_ID int not null references Product (ID_Product)
);
create table Slider(
	ID_Slider serial not null constraint PK_Slider primary key,
	Product_ID int not null references Product (ID_Product),
	Opisanie_Slider varchar(100) not null,
	Title_Slider varchar(50) not null
);
create table Sklad (
	ID_Sklad serial not null constraint PK_Sklad primary key, 
	Product_ID int not null references Product (ID_Product),
	Nalichie_Sklad int not null,
	Prodano_Sklad int not null default 0
);
create table Rassylka(
	ID_Rassylka serial not null constraint PK_Passylka primary key,
	Email_Rassylka varchar(320) not null constraint CH_Email_Rassylka check (Email_Rassylka similar to '%@%.%')
);
create table Profile (
	ID_Profile serial not null constraint PK_Profile primary key,
	First_Name_Profile varchar(50) not null,
	Last_Name_Profile varchar(50) not null,
	Email_Profile varchar(320) not null constraint CH_Email_Profile check (Email_Profile similar to '%@%.%') constraint UQ_Email_Profile unique,
	Phone_Profile  varchar(16) not null constraint CH_Phone_Profile check (Phone_Profile similar to '+[8-9]\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}') constraint UQ_Phone_Profile unique,
	Password_Profile varchar(25) not null constraint CH_Password_Profile check (Password_Profile similar to '%{6, 25}')
);





Create or replace procedure Category_Insert(p_Name_Category varchar(50))
language plpgsql
as $$
    begin
        insert into Category (Name_Category)
		values (p_Name_Category);
    end;
$$;
Create or replace procedure Category_Update(p_ID_Category int, p_Name_Category varchar(50))
language plpgsql
as $$
    begin
        update Category 
		set Name_Category = p_Name_Category
		where ID_Category = p_ID_Category;
    end;
$$;
Create or replace procedure Izdatel_Insert(p_Name_Izdatel varchar(50))
language plpgsql
as $$
    begin
        insert into Izdatel (Name_Izdatel)
		values (p_Name_Izdatel);
    end;
$$;
Create or replace procedure Izdatel_Update(p_ID_Izdatel int, p_Name_Izdatel varchar(50))
language plpgsql
as $$
    begin
        update Izdatel 
		set Name_Izdatel = p_Name_Izdatel
		where ID_Izdatel = p_ID_Izdatel;
    end;
$$;
Create or replace procedure Sposob_Oplaty_Insert(p_Name_Sposob_Oplaty varchar(50))
language plpgsql
as $$
    begin
        insert into Sposob_Oplaty (Name_Sposob_Oplaty)
		values (p_Name_Sposob_Oplaty);
    end;
$$;
Create or replace procedure Sposob_Oplaty_Update(p_ID_Sposob_Oplaty int, p_Name_Sposob_Oplaty varchar(50))
language plpgsql
as $$
    begin
        update Sposob_Oplaty 
		set Name_Sposob_Oplaty = p_Name_Sposob_Oplaty
		where ID_Sposob_Oplaty = p_ID_Sposob_Oplaty;
    end;
$$;
Create or replace procedure Akzii_Insert(p_Name_Akzii varchar(50))
language plpgsql
as $$
    begin
        insert into Akzii (Name_Akzii)
		values (p_Name_Akzii);
    end;
$$;
Create or replace procedure Akzii_Update(p_ID_Akzii int, p_Name_Akzii varchar(50))
language plpgsql
as $$
    begin
        update Akzii 
		set Name_Akzii = p_Name_Akzii
		where ID_Akzii = p_ID_Akzii;
    end;
$$;
Create or replace procedure Podcategory_Insert(p_Name_Podcategory varchar(50), p_Category_ID int)
language plpgsql
as $$
    begin
        insert into Podcategory (Name_Podcategory, Category_ID)
		values (p_Name_Podcategory, p_Category_ID);
    end;
$$;
Create or replace procedure Podcategory_Update(p_ID_Podcategory int, p_Name_Podcategory varchar(50), p_Category_ID int)
language plpgsql
as $$
    begin
        update Podcategory 
		set Name_Podcategory = p_Name_Podcategory,
		Category_ID= p_Category_ID
		where ID_Podcategory = p_ID_Podcategory;
    end;
$$;
Create or replace procedure Product_Insert(p_Name_Product varchar(50),p_Izdatel_ID int, p_Date_Vypusk_Product date, p_Category_ID int, p_Podcategory_ID int, p_Min_Igrok_Product int, p_Vozrast_Ogranich_Product int, p_Opisanie_Product varchar, p_Price_Product int, p_Vremya_Igry_Product int, p_image_product varchar)
language plpgsql
as $$
    begin
        insert into Product (Name_Product, Izdatel_ID, Date_Vypusk_Product, Category_ID, Podcategory_ID, Min_Igrok_Product, Vozrast_Ogranich_Product, Opisanie_Product, Price_Product, Vremya_Igry_Product, image_product)
		values (p_Name_Product, p_Izdatel_ID, p_Date_Vypusk_Product, p_Category_ID, p_Podcategory_ID, p_Min_Igrok_Product, p_Vozrast_Ogranich_Product, p_Opisanie_Product, p_Price_Product, p_Vremya_Igry_Product, p_image_product);
    end;
$$;
Create or replace procedure Product_Update(p_ID_Product int, p_Name_Product varchar(50),p_Izdatel_ID int, p_Date_Vypusk_Product date, p_Category_ID int, p_Podcategory_ID int, p_Min_Igrok_Product int, p_Vozrast_Ogranich_Product int, p_Opisanie_Product varchar, p_Price_Product int, p_Vremya_Igry_Product int, p_image_product varchar)
language plpgsql
as $$
    begin
        update Product set
		Name_Product = p_Name_Product,
		Izdatel_ID = p_Izdatel_ID,
		Date_Vypusk_Product = p_Date_Vypusk_Product,
		Category_ID = p_Category_ID,
		Podcategory_ID = p_Podcategory_ID,
		Min_Igrok_Product = p_Min_Igrok_Product,
		Vozrast_Ogranich_Product = p_Vozrast_Ogranich_Product,
		Opisanie_Product = p_Opisanie_Product,
		Price_Product = p_Price_Product,
		Vremya_Igry_Product = p_Vremya_Igry_Product, 
		image_product = p_image_product
		where ID_Product = p_ID_Product;
    end;
$$;
Create or replace procedure Zakaz_Insert(p_First_Name_Zakaz varchar(50), p_Last_Name_Zakaz varchar(50), p_Email_Zakaz varchar(320), p_Phone_Zakaz varchar(16), p_Date_Zakaz date, p_Itog_Stoimost_Zakaz int, p_Akzii_ID int, p_Adress_Zakaz varchar(200), p_Sposob_Oplaty_ID int)
language plpgsql
as $$
    begin
        insert into Zakaz (First_Name_Zakaz, Last_Name_Zakaz, Email_Zakaz, Phone_Zakaz, Date_Zakaz, Itog_Stoimost_Zakaz, Akzii_ID, Adress_Zakaz, Sposob_Oplaty_ID)
		values (p_First_Name_Zakaz, p_Last_Name_Zakaz, p_Email_Zakaz, p_Phone_Zakaz, p_Date_Zakaz, p_Itog_Stoimost_Zakaz, p_Akzii_ID, p_Adress_Zakaz, p_Sposob_Oplaty_ID);
    end;
$$;
Create or replace procedure Zakaz_Update(p_ID_Zakaz int, p_First_Name_Zakaz varchar(50), p_Last_Name_Zakaz varchar(50), p_Email_Zakaz varchar(320), p_Phone_Zakaz varchar(16), p_Date_Zakaz date, p_Itog_Stoimost_Zakaz int, p_Akzii_ID int, p_Adress_Zakaz varchar(200), p_Sposob_Oplaty_ID int)
language plpgsql
as $$
    begin
        update Zakaz set 
		First_Name_Zakaz = p_First_Name_Zakaz,
		Last_Name_Zakaz = p_Last_Name_Zakaz,
		Email_Zakaz = p_Email_Zakaz,
		Phone_Zakaz = p_Phone_Zakaz,
		Date_Zakaz = p_Date_Zakaz,
		Itog_Stoimost_Zakaz = p_Itog_Stoimost_Zakaz,
		Akzii_ID = p_Akzii_ID,
		Adress_Zakaz = p_Adress_Zakaz,
		Sposob_Oplaty_ID = p_Sposob_Oplaty_ID
		where ID_Zakaz = p_ID_Zakaz;
    end;
$$;
Create or replace procedure Zakaz_Product_Insert(p_Zakaz_ID int, p_Product_ID int)
language plpgsql
as $$
    begin
        insert into Zakaz_Product (Zakaz_ID, Product_ID)
		values (p_Zakaz_ID, p_Product_ID);
    end;
$$;
Create or replace procedure Zakaz_Product_Update(p_ID_Zakaz_Product int, p_Zakaz_ID int, p_Product_ID int)
language plpgsql
as $$
    begin
        update Zakaz_Product set
		Zakaz_ID = p_Zakaz_ID,
		Product_ID = p_Product_ID
		where ID_Zakaz_Product = p_ID_Zakaz_Product;
    end;
$$;
Create or replace procedure Slider_Insert(p_Product_ID int, p_Opisanie_Slider varchar(100), p_Title_Slider varchar(50))
language plpgsql
as $$
    begin
        insert into Slider (Product_ID, Opisanie_Slider, Title_Slider)
		values (p_Product_ID, p_Opisanie_Slider, p_Title_Slider);
    end;
$$;
Create or replace procedure Slider_Update(p_ID_Slider int, p_Product_ID int, p_Opisanie_Slider varchar(100), p_Title_Slider varchar(50))
language plpgsql
as $$
    begin
        update Slider set 
		Product_ID = p_Product_ID,
		Opisanie_Slider = p_Opisanie_Slider,
		Title_Slider = p_Title_Slider
		where ID_Slider = p_ID_Slider;
    end;
$$;
Create or replace procedure Sklad_Insert(p_Product_ID int, p_Nalichie_Sklad int)
language plpgsql
as $$
    begin
        insert into Sklad (Product_ID, Nalichie_Sklad)
		values (p_Product_ID, p_Nalichie_Sklad);
    end;
$$;
Create or replace procedure Sklad_Update(p_ID_Sklad int, p_Product_ID int, p_Nalichie_Sklad int)
language plpgsql
as $$
    begin
        update Sklad set
		Product_ID = p_Product_ID,
		Nalichie_Sklad = p_Nalichie_Sklad
		where ID_Sklad = p_ID_Sklad;
    end;
$$;
Create or replace procedure Rassylka_Insert(p_Email_Rassylka varchar(320))
language plpgsql
as $$
    begin
        insert into Rassylka (Email_Rassylka)
		values (p_Email_Rassylka);
    end;
$$;
Create or replace procedure Rassylka_Update(p_ID_Rassylka int, p_Email_Rassylka varchar(320))
language plpgsql
as $$
    begin
        update Rassylka set
		Email_Rassylka = p_Email_Rassylka
		where ID_Rassylka = p_ID_Rassylka;
    end;
$$;
Create or replace procedure Profile_Insert(p_First_Name_Profile varchar(50), p_Last_Name_Profile varchar(50), p_Email_Profile varchar(320), p_Phone_Profile  varchar(16), p_Password_Profile varchar(25))
language plpgsql
as $$
    begin
        insert into Profile (First_Name_Profile, Last_Name_Profile, Email_Profile, Phone_Profile, Password_Profile)
		values (p_First_Name_Profile, p_Last_Name_Profile, p_Email_Profile, p_Phone_Profile, p_Password_Profile);
    end;
$$;
Create or replace procedure Profile_Update(p_ID_Profile int, p_First_Name_Profile varchar(50), p_Last_Name_Profile varchar(50), p_Email_Profile varchar(320), p_Phone_Profile  varchar(16), p_Password_Profile varchar(25))
language plpgsql
as $$
    begin
        update Profile set
		First_Name_Profile = p_First_Name_Profile,
		Last_Name_Profile = p_Last_Name_Profile,
		Email_Profile = p_Email_Profile,
		Phone_Profile = p_Phone_Profile,
		Password_Profile = p_Password_Profile
		where ID_Profile = p_ID_Profile;
    end;
$$;

Create or replace procedure Product_Set_Skidka(p_ID_Product int, p_Skidka_Product int)
language plpgsql
as $$
    begin
        update Product set
			Skidka_Product = p_Skidka_Product
		where ID_Product = p_ID_Product;
    end;
$$;
Create or replace procedure Sklad_Add_Prodano(p_ID_Product int, p_Prodano_Sklad int)
language plpgsql
as $$
    begin
        update Sklad set
			Prodano_Sklad = (Prodano_Sklad + p_Prodano_Sklad)
		where Product_ID = p_ID_Product;
    end;
$$;
Create or replace procedure Sklad_Add_Nalichie(p_ID_Product int, p_Nalichie_Sklad int)
language plpgsql
as $$
    begin
        update Sklad set
			Nalichie_Sklad = (Nalichie_Sklad + p_Nalichie_Sklad)
		where Product_ID = p_ID_Product;
    end;
$$;
Create or replace procedure Sklad_Sub_Nalichie(p_ID_Product int, p_Nalichie_Sklad int)
language plpgsql
as $$
    begin
        update Sklad set
			Nalichie_Sklad = (Nalichie_Sklad - p_Nalichie_Sklad)
		where Product_ID = p_ID_Product;
    end;
$$;




call category_insert('warhammer');
call category_insert('ccg');
call category_insert('rpgames');

call Podcategory_insert('w40k', 1);
call Podcategory_insert('bg', 1);
call Podcategory_insert('mtg', 2);
call Podcategory_insert('berserk', 2);
call Podcategory_insert('dnd', 3);
call Podcategory_insert('pf', 3);
call Izdatel_insert('Games Workshop');
call Izdatel_insert('Wizards of the Coast');


call product_insert('Warhammer 40000', 1, '2020-11-11', 1, 1, 4, 16,'Стоит отдельно отметить, что расширенный набор по Warhammer 40,000, подобный данному, 
					впервые выходит в официально и полностью русифицированной версии. Не упустите возможность уникального и лингвистически доступного 
					знакомства с увлекательным миром отчаянных воинов и грандиозных сражений в тёмном мире далёкого 41-го тысячелетия!', 10990, 60, 'warhammer40kdrukhari.png');
call product_insert('Warhammer 50000', 1, '2020-11-11', 1, 1, 4, 16,'Стоит отдельно отметить, что расширенный набор по Warhammer 40,000, подобный данному, 
					впервые выходит в официально и полностью русифицированной версии. Не упустите возможность уникального и лингвистически доступного 
					знакомства с увлекательным миром отчаянных воинов и грандиозных сражений в тёмном мире далёкого 41-го тысячелетия!', 5990, 60, 'warhammer40kdrukhari.png');
call product_insert('MTG Бустеры - Базовый выпуск 2019', 2, '2019-1-11', 2, 2, 2, 14, '6 драфт-бустеров выпуска ""Иннистрад: Багровая Клятва', 2990, 20, 'mtgbazoviy19.jpg');
call product_set_skidka(1, 50);
select * from product;
select * from akzii;
select * from category;
select * from podcategory;
select * from rassylka;
select * from sklad;
select * from slider;




/*
call category_insert('Категория1');
call category_insert('Категория2');
call Podcategory_insert('Подкатегория1_1', 1);
call Podcategory_insert('Подкатегория1_2', 1);
call Podcategory_insert('Подкатегория2_1', 2);
call Podcategory_insert('Подкатегория2_2', 2);
call Izdatel_insert('Издатель1');

call product_insert('оно ахуенно', 1, '2011-11-11', 1, 1, 1, 0,'hghghg', 3030, 30, 'images/1.png');
call product_insert('оно потрясающе', 1, '2011-11-11', 1, 1, 1, 5,'hghghg', 3030, 120, 'mafia.jpg');
call product_insert('оно вам нужно', 1, '2011-11-11', 2, 3, 1, 99,'hghghg', 3030, 120, 'images/3.png');
call product_insert('что это?', 1, '2011-11-11', 1, 2, 1, 12,'hghghg', 3030, 120, 'images/4.png');
call product_update(1, 'мы не ебем что продаем', 1, '2011-11-11', 2, 4, 1, null,'hghghg', 3030, null, 'images/1.png');
call product_set_skidka(1, 50);
select * from product;
*/






/*
drop table if exists Profile;
drop table if exists Rassylka;
drop table if exists Sklad;
drop table if exists Slider;
drop table if exists Zakaz_Product;
drop table if exists Zakaz;
drop table if exists Product;
drop table if exists Podcategory;
drop table if exists Akzii;
drop table if exists Sposob_Oplaty;
drop table if exists Izdatel;
drop table if exists Category;

drop procedure if exists Category_Insert;
drop procedure if exists Izdatel_Insert;
drop procedure if exists Sposob_Oplaty_Insert;
drop procedure if exists Akzii_Insert;
drop procedure if exists Podcategory_Insert;
drop procedure if exists Product_Insert;
drop procedure if exists Zakaz_Insert;
drop procedure if exists Zakaz_Product_Insert;
drop procedure if exists Slider_Insert;
drop procedure if exists Sklad_Insert;
drop procedure if exists Rassylka_Insert;
drop procedure if exists Profile_Insert;

drop procedure if exists Category_Update;
drop procedure if exists Izdatel_Update;
drop procedure if exists Sposob_Oplaty_Update;
drop procedure if exists Akzii_Update;
drop procedure if exists Podcategory_Update;
drop procedure if exists Product_Update;
drop procedure if exists Zakaz_Update;
drop procedure if exists Zakaz_Product_Update;
drop procedure if exists Slider_Update;
drop procedure if exists Sklad_Update;
drop procedure if exists Rassylka_Update;
drop procedure if exists Profile_Update;

drop procedure if exists Product_Set_Skidka;
drop procedure if exists Sklad_Add_Prodano;
drop procedure if exists Sklad_Add_Nalichie;
drop procedure if exists Sklad_Sub_Nalichie;
*/