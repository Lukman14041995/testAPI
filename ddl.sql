-- Adminer 4.8.1 PostgreSQL 14.5 dump

DROP TABLE IF EXISTS "banners";
DROP SEQUENCE IF EXISTS banners_id_seq;
CREATE SEQUENCE banners_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."banners" (
    "id" integer DEFAULT nextval('banners_id_seq') NOT NULL,
    "banner_name" character varying(255) NOT NULL,
    "banner_image" character varying(255) NOT NULL,
    "description" text NOT NULL,
    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "banners" ("id", "banner_name", "banner_image", "description") VALUES
(1,	'Banner 1',	'https://nutech-integrasi.app/dummy.jpg',	'Lerem Ipsum Dolor sit amet'),
(2,	'Banner 2',	'https://nutech-integrasi.app/dummy.jpg',	'Lerem Ipsum Dolor sit amet'),
(3,	'Banner 3',	'https://nutech-integrasi.app/dummy.jpg',	'Lerem Ipsum Dolor sit amet'),
(4,	'Banner 4',	'https://nutech-integrasi.app/dummy.jpg',	'Lerem Ipsum Dolor sit amet'),
(5,	'Banner 5',	'https://nutech-integrasi.app/dummy.jpg',	'Lerem Ipsum Dolor sit amet'),
(6,	'Banner 6',	'https://nutech-integrasi.app/dummy.jpg',	'Lerem Ipsum Dolor sit amet');

DROP TABLE IF EXISTS "ppob_services";
DROP SEQUENCE IF EXISTS ppob_services_id_seq;
CREATE SEQUENCE ppob_services_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."ppob_services" (
    "id" integer DEFAULT nextval('ppob_services_id_seq') NOT NULL,
    "service_code" character varying(50) NOT NULL,
    "service_name" character varying(255) NOT NULL,
    "service_icon" character varying(255) NOT NULL,
    "service_tariff" integer NOT NULL,
    CONSTRAINT "ppob_services_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "ppob_services" ("id", "service_code", "service_name", "service_icon", "service_tariff") VALUES
(1,	'PAJAK',	'Pajak PBB',	'https://nutech-integrasi.app/dummy.jpg',	40000),
(2,	'PLN',	'Listrik',	'https://nutech-integrasi.app/dummy.jpg',	10000),
(3,	'PDAM',	'PDAM Berlangganan',	'https://nutech-integrasi.app/dummy.jpg',	40000),
(4,	'PULSA',	'Pulsa',	'https://nutech-integrasi.app/dummy.jpg',	40000),
(5,	'PGN',	'PGN Berlangganan',	'https://nutech-integrasi.app/dummy.jpg',	50000),
(6,	'MUSIK',	'Musik Berlangganan',	'https://nutech-integrasi.app/dummy.jpg',	50000),
(7,	'TV',	'TV Berlangganan',	'https://nutech-integrasi.app/dummy.jpg',	50000),
(8,	'PAKET_DATA',	'Paket data',	'https://nutech-integrasi.app/dummy.jpg',	50000),
(9,	'VOUCHER_GAME',	'Voucher Game',	'https://nutech-integrasi.app/dummy.jpg',	100000),
(10,	'VOUCHER_MAKANAN',	'Voucher Makanan',	'https://nutech-integrasi.app/dummy.jpg',	100000),
(11,	'QURBAN',	'Qurban',	'https://nutech-integrasi.app/dummy.jpg',	200000),
(12,	'ZAKAT',	'Zakat',	'https://nutech-integrasi.app/dummy.jpg',	300000);

DROP TABLE IF EXISTS "transactions";
DROP SEQUENCE IF EXISTS transactions_id_seq;
CREATE SEQUENCE transactions_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."transactions" (
    "id" integer DEFAULT nextval('transactions_id_seq') NOT NULL,
    "user_id" integer,
    "transaction_type" character varying(50),
    "amount" integer,
    "transaction_date" timestamp DEFAULT CURRENT_TIMESTAMP,
    "service_code" character varying(255),
    "service_name" character varying(255),
    "invoice_number" character varying(255),
    "description" text,
    "total_amount" numeric(10,2),
    "created_on" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "transactions" ("id", "user_id", "transaction_type", "amount", "transaction_date", "service_code", "service_name", "invoice_number", "description", "total_amount", "created_on") VALUES
(1,	4,	'PAYMENT',	10000,	'2024-12-01 16:33:06.040759',	'PULSA',	'Pulsa',	'INV1733045585975-521',	NULL,	NULL,	'2024-12-01 21:40:20.093515');

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "email" character varying(255) NOT NULL,
    "first_name" character varying(100) NOT NULL,
    "last_name" character varying(100) NOT NULL,
    "password" text NOT NULL,
    "profile_image" character varying(255),
    "balance" integer DEFAULT '0',
    CONSTRAINT "users_email_key" UNIQUE ("email"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "users" ("id", "email", "first_name", "last_name", "password", "profile_image", "balance") VALUES
(1,	'user@nutech-integrasi.com',	'User',	'Nutech',	'$2y$10$ypx0rsdSOnhcZpOAsGPugep3aYGjuAKLkbh73z5VJ.dlW063u/zo.',	NULL,	0),
(2,	'valid.email@example.com',	'John',	'Doe',	'$2b$10$ji3U8piVVtuYhFSMgjnKp.7hK/IHk6RmvqtP.CqGVgH31RoFM7Z6q',	NULL,	0),
(3,	'valids.email@example.com',	'John',	'Doe',	'$2b$10$B.iNnbmhXwihBHKLVJe.Eutae9F.zj7GGkp9OLdSvD7NIucTliUHG',	NULL,	30000),
(4,	'validss.email@example.com',	'User Edited',	'Nutech Edited',	'$2b$10$glaWfO7UETNRxDcxh3AnQuP962RYL4VFty2aWLnpew/9bk2MkrCxW',	'uploads\1733040435729-882062187-TIKET PULANG.jpeg',	990000);

ALTER TABLE ONLY "public"."transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE NOT DEFERRABLE;

-- 2024-12-01 21:47:58.341697+07
