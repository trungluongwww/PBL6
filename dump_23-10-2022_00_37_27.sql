--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Debian 14.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: accounts_role_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.accounts_role_enum AS ENUM (
    'customer',
    'shop',
    'admin'
);


--
-- Name: orders_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.orders_status_enum AS ENUM (
    'wait_for_confirm',
    'confirmed',
    'delivering',
    'completed',
    'cancelled'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accounts (
    id character varying NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    name text NOT NULL,
    role public.accounts_role_enum NOT NULL,
    email character varying NOT NULL,
    phone character varying NOT NULL,
    district_id integer,
    province_id integer,
    ward_code character varying,
    address text,
    avatar character varying DEFAULT 'default.png'::character varying
);


--
-- Name: order_and_products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_and_products (
    id character varying NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    order_id character varying NOT NULL,
    product_id character varying NOT NULL,
    quantity integer NOT NULL
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id character varying NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    customer_id character varying NOT NULL,
    shop_id character varying NOT NULL,
    address text NOT NULL,
    to_name text NOT NULL,
    to_phone text NOT NULL,
    to_district_id integer NOT NULL,
    to_ward_code character varying NOT NULL,
    to_street text NOT NULL,
    service_id integer NOT NULL,
    voucher_id character varying,
    product_ids character varying[] NOT NULL,
    total_price numeric DEFAULT '0'::numeric NOT NULL,
    status public.orders_status_enum DEFAULT 'wait_for_confirm'::public.orders_status_enum NOT NULL,
    from_disctrict_id integer,
    delivery_fee numeric DEFAULT '0'::numeric NOT NULL,
    total numeric DEFAULT '0'::numeric NOT NULL,
    total_discount numeric DEFAULT '0'::numeric NOT NULL,
    product_discount numeric DEFAULT '0'::numeric NOT NULL,
    voucher_discount numeric DEFAULT '0'::numeric NOT NULL,
    search text DEFAULT ''::text NOT NULL,
    code character varying,
    is_shop_deleted boolean DEFAULT false NOT NULL,
    is_customer_deleted boolean DEFAULT false NOT NULL
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id character varying NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    weight numeric NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    length integer NOT NULL,
    price numeric DEFAULT '0'::numeric NOT NULL,
    avatar character varying NOT NULL,
    discount numeric DEFAULT '0'::numeric NOT NULL,
    active boolean NOT NULL,
    quantity integer DEFAULT 0 NOT NULL
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    id character varying NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    order_id character varying NOT NULL,
    customer_id character varying NOT NULL,
    product_ids character varying[] NOT NULL,
    content text NOT NULL,
    rating double precision,
    is_deleted boolean DEFAULT false NOT NULL
);


--
-- Name: vouchers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vouchers (
    id character varying NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    code character varying NOT NULL,
    discount_percent numeric DEFAULT '0'::numeric NOT NULL,
    discount_value numeric DEFAULT '0'::numeric NOT NULL,
    quantity integer NOT NULL,
    is_active boolean NOT NULL,
    is_delete boolean DEFAULT false NOT NULL
);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.accounts (id, created_at, updated_at, name, role, email, phone, district_id, province_id, ward_code, address, avatar) FROM stdin;
8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	2022-09-21 13:45:21.426+00	2022-09-21 13:45:21.426+00	Trung	customer	trungluongw@gmail.com	077887878	3695	202	90768	12 Ho Xuan Huong	default.png
8dcc9380-95ed-4ec2-a43f-9e3eeae7d122	2022-09-21 13:45:21.426+00	2022-09-21 13:45:21.426+00	Toan	customer	toan@gmail.com	02123122	1531	203	40706	103 Hoan Van Thu	default.png
8asd2580-95ed-4ec2-a43f-9e3eeae7d122	2022-09-21 13:45:21.426+00	2022-09-21 13:45:21.426+00	admin	admin	trung@gmail.com	021231222213123	1804	\N	\N	\N	default.png
8dcc2580-95ed-4ec2-a43f-9e3eeae7d122	2022-09-21 13:45:21.426+00	2022-09-21 13:45:21.426+00	Thanh	shop	thanh@gmail.com	02123122232	1804	201	1B2215	122 Le Dai Hnah	default.png
8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	2022-09-21 13:45:21.426+00	2022-09-21 13:45:21.426+00	Trang	shop	wqeqw@gmail.com	044568787	1804	201	1B2215	20 Ly Thai Tp	default.png
\.


--
-- Data for Name: order_and_products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_and_products (id, created_at, updated_at, order_id, product_id, quantity) FROM stdin;
43cc46e4-e7b4-44d4-a768-56f634e8c9c4	2022-09-30 09:38:01.458+00	2022-09-30 09:38:01.458+00	5da28ce6-9a65-44e2-a0be-21a5229f048d	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	1
89a1ea4f-f3cd-4528-96cc-842954193ed5	2022-09-30 09:38:01.458+00	2022-09-30 09:38:01.458+00	5da28ce6-9a65-44e2-a0be-21a5229f048d	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
ed01c9b9-dc5b-4c0a-ac64-99b5f51425e7	2022-10-07 09:21:28.538+00	2022-10-07 09:21:28.538+00	e7a529c6-1aba-4173-a035-3374a61475cb	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
9854828c-20ea-40b1-82d0-05b6243da7bb	2022-10-07 09:21:28.538+00	2022-10-07 09:21:28.538+00	e7a529c6-1aba-4173-a035-3374a61475cb	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
5a6fa6e5-caf0-410c-8c8e-504df8ebb8d1	2022-10-08 14:51:25.499+00	2022-10-08 14:51:25.499+00	9a9daf51-ee70-4fe1-8b6f-59093dea32f2	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
0383562f-a391-4254-9c58-08279192dfe8	2022-10-08 14:51:25.499+00	2022-10-08 14:51:25.499+00	9a9daf51-ee70-4fe1-8b6f-59093dea32f2	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
25d000fa-2eb2-4bae-b822-3aa80ade387c	2022-10-08 15:03:25.183+00	2022-10-08 15:03:25.183+00	3bf50dd5-e212-4fe1-95b1-f1fc56817831	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
57bbac1f-bfc6-4c3b-94ac-5ac5350e6921	2022-10-08 15:03:25.183+00	2022-10-08 15:03:25.183+00	3bf50dd5-e212-4fe1-95b1-f1fc56817831	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
2b3485d2-4f50-4e78-b25a-a2166a9af68d	2022-10-08 15:06:48.968+00	2022-10-08 15:06:48.968+00	496437ef-8935-441e-825c-a04bdb84e935	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
57f6362d-a598-4fcd-8580-88bb5e557487	2022-10-08 15:06:48.968+00	2022-10-08 15:06:48.968+00	496437ef-8935-441e-825c-a04bdb84e935	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
3adcccde-8da0-49b0-b126-ce566b1f3625	2022-10-08 15:12:40.837+00	2022-10-08 15:12:40.837+00	781127d9-21a1-4757-a445-4521e5fc4030	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
33414697-6727-43aa-bea7-668cc3382570	2022-10-08 15:12:40.837+00	2022-10-08 15:12:40.837+00	781127d9-21a1-4757-a445-4521e5fc4030	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
e461401e-85bd-497c-b324-b200478ee30d	2022-10-08 15:16:03.087+00	2022-10-08 15:16:03.087+00	02888536-36f4-42a4-8501-0830418ff50d	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
b262fcf1-6d16-4789-a48d-39f0e44407a1	2022-10-08 15:16:03.087+00	2022-10-08 15:16:03.087+00	02888536-36f4-42a4-8501-0830418ff50d	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
5004cdfa-406f-44d5-a3da-a48635a3763b	2022-10-08 15:18:07.49+00	2022-10-08 15:18:07.49+00	7f40ea0f-12bb-466a-aa14-af666d534744	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
7f35a446-8b26-491d-981d-bc0eeff59af5	2022-10-08 15:18:07.49+00	2022-10-08 15:18:07.49+00	7f40ea0f-12bb-466a-aa14-af666d534744	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
c6bde513-6bec-4893-afcf-7a77ae20bae0	2022-10-08 15:19:01.137+00	2022-10-08 15:19:01.137+00	3aa676f8-e4a1-4423-8662-5ca5085fbc03	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
3cd8d85f-0f5b-4192-9e8f-ab4f1a46ec67	2022-10-08 15:19:01.137+00	2022-10-08 15:19:01.137+00	3aa676f8-e4a1-4423-8662-5ca5085fbc03	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
932b2c7a-17ce-4501-9902-4f27fa943255	2022-10-08 15:22:10.706+00	2022-10-08 15:22:10.706+00	d851487f-36a9-4f75-8560-ba5d59ed7c52	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
9339acfd-9ca2-4d0a-8d77-dc6d5c6a2f05	2022-10-08 15:22:10.706+00	2022-10-08 15:22:10.706+00	d851487f-36a9-4f75-8560-ba5d59ed7c52	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
226afc89-c8ab-414a-9add-c312247d7b02	2022-10-08 15:22:54.755+00	2022-10-08 15:22:54.755+00	9e78b075-35e6-46be-857b-47c47d903aa5	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
17af386d-1439-42b2-a0f7-b27993cd0d40	2022-10-08 15:22:54.755+00	2022-10-08 15:22:54.755+00	9e78b075-35e6-46be-857b-47c47d903aa5	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
7ac8a68a-0d63-4d83-8127-2cb6385d1a89	2022-10-09 10:23:12.737+00	2022-10-09 10:23:12.737+00	1694f3c6-8b8a-4a8b-9c2a-89a1e63344f5	8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	4
612c1ef1-76be-42cf-b1b1-82ed641bd4ce	2022-10-09 10:23:12.737+00	2022-10-09 10:23:12.737+00	1694f3c6-8b8a-4a8b-9c2a-89a1e63344f5	8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2
b443828e-3dd3-4e3f-9f62-3c1e524adb0c	2022-10-10 02:42:32.346+00	2022-10-10 02:42:32.346+00	5c3e2bb5-bc34-4510-aadf-7df054efde5f	8dcc9380-12ed-4ec2-a43f-9e3eeae7d688	2
062633dc-b971-4462-a6b0-7aee429a849a	2022-10-10 02:42:32.346+00	2022-10-10 02:42:32.346+00	5c3e2bb5-bc34-4510-aadf-7df054efde5f	8dcc2280-95ed-4ec2-a43f-9e3eeae7d688	2
f6bd3513-ad4d-4645-bf41-a6ce32f9caf1	2022-10-10 02:45:30.655+00	2022-10-10 02:45:30.655+00	737424d0-c62f-4ca3-a91a-1c2ab28f7c2c	8dcc9380-12ed-4ec2-a43f-9e3eeae7d688	2
2d83f8a7-b7b4-4a0e-b26c-f53bd98bb0a5	2022-10-10 02:45:30.655+00	2022-10-10 02:45:30.655+00	737424d0-c62f-4ca3-a91a-1c2ab28f7c2c	8dcc2280-95ed-4ec2-a43f-9e3eeae7d688	2
9c948a07-b445-4f9b-8f50-0be313d019d8	2022-10-15 05:17:25.011+00	2022-10-15 05:17:25.011+00	f11e455c-8916-49c7-b78f-a0414b8eb350	8dcc9380-12ed-4ec2-a43f-9e3eeae7d688	2
8f475f55-a48e-40d1-a007-18f919726892	2022-10-15 05:17:25.011+00	2022-10-15 05:17:25.011+00	f11e455c-8916-49c7-b78f-a0414b8eb350	8dcc2280-95ed-4ec2-a43f-9e3eeae7d688	2
05642e01-4c9f-4e7d-92fa-d1b40b230591	2022-10-15 05:25:04.745+00	2022-10-15 05:25:04.745+00	ed42f0d2-3a28-4b16-a67f-ed164b2a987b	8dcc9380-12ed-4ec2-a43f-9e3eeae7d688	2
6bc3de8d-4a13-4851-8fed-c62466834805	2022-10-15 05:25:04.745+00	2022-10-15 05:25:04.745+00	ed42f0d2-3a28-4b16-a67f-ed164b2a987b	8dcc2280-95ed-4ec2-a43f-9e3eeae7d688	2
46e87441-71a9-4ec0-ac04-1520eb68f062	2022-10-15 05:32:16.629+00	2022-10-15 05:32:16.629+00	607cb0da-2c78-40b1-8aea-31feaa72fa54	8dcc9380-12ed-4ec2-a43f-9e3eeae7d688	2
b9701675-f2bb-48cd-82d9-6d802e1427c2	2022-10-15 05:32:16.629+00	2022-10-15 05:32:16.629+00	607cb0da-2c78-40b1-8aea-31feaa72fa54	8dcc2280-95ed-4ec2-a43f-9e3eeae7d688	2
a5aba643-2aca-4152-8175-c50b2bf035c1	2022-10-15 05:34:17.327+00	2022-10-15 05:34:17.327+00	5e378176-5980-40be-89bb-66ddf5103872	8dcc9380-12ed-4ec2-a43f-9e3eeae7d688	2
a3591539-9300-4fc3-8721-ceedd5302088	2022-10-15 05:34:17.327+00	2022-10-15 05:34:17.327+00	5e378176-5980-40be-89bb-66ddf5103872	8dcc2280-95ed-4ec2-a43f-9e3eeae7d688	2
c5f1d386-85f4-405f-83f7-d2de79b3a254	2022-10-17 14:39:08.677+00	2022-10-17 14:39:08.677+00	a82784fe-0ca8-47f7-8f46-912fe0d60ba2	8dcc9380-12ed-4ec2-a43f-9e3eeae7d688	2
43ac6f34-afa8-46de-b004-90c9acdc19b4	2022-10-17 14:39:08.677+00	2022-10-17 14:39:08.677+00	a82784fe-0ca8-47f7-8f46-912fe0d60ba2	8dcc2280-95ed-4ec2-a43f-9e3eeae7d688	2
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, created_at, updated_at, customer_id, shop_id, address, to_name, to_phone, to_district_id, to_ward_code, to_street, service_id, voucher_id, product_ids, total_price, status, from_disctrict_id, delivery_fee, total, total_discount, product_discount, voucher_discount, search, code, is_shop_deleted, is_customer_deleted) FROM stdin;
5da28ce6-9a65-44e2-a0be-21a5229f048d	2022-09-30 09:38:01.451+00	2022-09-30 09:38:01.451+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	203	1025	string	3	\N	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	100000	wait_for_confirm	\N	0	0	0	0	0		\N	f	f
bafa282a-7b3b-4ca7-a252-7f2381489d67	2022-10-07 09:21:18.977+00	2022-10-07 09:21:18.977+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	203	1025	string	3	\N	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,NULL}	200000	wait_for_confirm	\N	0	0	0	0	0		\N	f	f
e7a529c6-1aba-4173-a035-3374a61475cb	2022-10-07 09:21:28.528+00	2022-10-07 09:21:28.528+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	203	1025	string	3	\N	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	wait_for_confirm	\N	0	0	0	0	0		\N	f	f
9a9daf51-ee70-4fe1-8b6f-59093dea32f2	2022-10-08 14:51:25.455+00	2022-10-08 14:51:25.455+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	1687	40611	string	53321	\N	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	wait_for_confirm	\N	78997	308997	20000	0	0		\N	f	f
496437ef-8935-441e-825c-a04bdb84e935	2022-10-08 15:06:48.929+00	2022-10-08 15:06:48.929+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	wait_for_confirm	\N	78997	285997	43000	0	0		\N	f	f
781127d9-21a1-4757-a445-4521e5fc4030	2022-10-08 15:12:40.79+00	2022-10-08 15:12:40.79+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	wait_for_confirm	\N	78997	NaN	NaN	20000	NaN		\N	f	f
3aa676f8-e4a1-4423-8662-5ca5085fbc03	2022-10-08 15:19:01.106+00	2022-10-08 15:19:01.106+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	wait_for_confirm	\N	78997	NaN	NaN	20000	NaN		\N	f	f
d851487f-36a9-4f75-8560-ba5d59ed7c52	2022-10-08 15:22:10.654+00	2022-10-08 15:22:10.654+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	wait_for_confirm	\N	78997	NaN	NaN	20000	NaN		\N	f	f
9e78b075-35e6-46be-857b-47c47d903aa5	2022-10-08 15:22:54.704+00	2022-10-08 15:22:54.704+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	wait_for_confirm	\N	78997	285997	43000	20000	23000		\N	f	f
1694f3c6-8b8a-4a8b-9c2a-89a1e63344f5	2022-10-09 10:23:12.703+00	2022-10-09 10:23:12.703+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	wait_for_confirm	\N	78997	285997	43000	20000	23000		\N	f	f
5c3e2bb5-bc34-4510-aadf-7df054efde5f	2022-10-10 02:42:32.307+00	2022-10-10 02:42:32.307+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d122	8dcc2580-95ed-4ec2-a43f-9e3eeae7d122	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-12ed-4ec2-a43f-9e3eeae7d688,8dcc2280-95ed-4ec2-a43f-9e3eeae7d688}	260000	wait_for_confirm	\N	58999	251599	67400	46000	21400		\N	f	f
737424d0-c62f-4ca3-a91a-1c2ab28f7c2c	2022-10-10 02:45:30.626+00	2022-10-10 02:45:30.626+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d122	8dcc2580-95ed-4ec2-a43f-9e3eeae7d122	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-12ed-4ec2-a43f-9e3eeae7d688,8dcc2280-95ed-4ec2-a43f-9e3eeae7d688}	260000	wait_for_confirm	\N	58999	251599	67400	46000	21400		\N	f	f
02888536-36f4-42a4-8501-0830418ff50d	2022-10-08 15:16:03.03+00	2022-10-14 14:09:41.088+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	delivering	\N	78997	NaN	NaN	20000	NaN		\N	f	f
ed42f0d2-3a28-4b16-a67f-ed164b2a987b	2022-10-15 05:25:04.706+00	2022-10-15 05:25:04.706+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d122	8dcc2580-95ed-4ec2-a43f-9e3eeae7d122	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-12ed-4ec2-a43f-9e3eeae7d688,8dcc2280-95ed-4ec2-a43f-9e3eeae7d688}	260000	wait_for_confirm	\N	58999	251599	67400	46000	21400		1665811504706AUEDxIieR3	f	f
7f40ea0f-12bb-466a-aa14-af666d534744	2022-10-08 15:18:07.448+00	2022-10-14 14:14:09.092+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	delivering	\N	78997	NaN	NaN	20000	NaN		\N	f	f
607cb0da-2c78-40b1-8aea-31feaa72fa54	2022-10-15 05:32:16.576+00	2022-10-15 05:32:16.576+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d122	8dcc2580-95ed-4ec2-a43f-9e3eeae7d122	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-12ed-4ec2-a43f-9e3eeae7d688,8dcc2280-95ed-4ec2-a43f-9e3eeae7d688}	260000	wait_for_confirm	\N	58999	251599	67400	46000	21400		1665811936576u5HwrtTpMJ	f	f
5e378176-5980-40be-89bb-66ddf5103872	2022-10-15 05:34:17.285+00	2022-10-15 05:34:17.285+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc2580-95ed-4ec2-a43f-9e3eeae7d122	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-12ed-4ec2-a43f-9e3eeae7d688,8dcc2280-95ed-4ec2-a43f-9e3eeae7d688}	260000	wait_for_confirm	\N	58999	251599	67400	46000	21400		1665812057285cmhGkOJOsX	f	f
3bf50dd5-e212-4fe1-95b1-f1fc56817831	2022-10-08 15:03:25.144+00	2022-10-14 14:11:07.368+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc9380-95ed-4ec2-a43f-9e3eeae7d697	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	250000	completed	\N	78997	283997	45000	0	0		\N	f	t
a82784fe-0ca8-47f7-8f46-912fe0d60ba2	2022-10-17 14:39:08.647+00	2022-10-17 14:39:08.647+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	8dcc2580-95ed-4ec2-a43f-9e3eeae7d122	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-12ed-4ec2-a43f-9e3eeae7d688,8dcc2280-95ed-4ec2-a43f-9e3eeae7d688}	260000	wait_for_confirm	\N	58999	251599	67400	46000	21400		1666017548647nus248y5J3	f	f
f11e455c-8916-49c7-b78f-a0414b8eb350	2022-10-15 05:17:24.976+00	2022-10-15 05:17:24.976+00	8dcc9380-95ed-4ec2-a43f-9e3eeae7d122	8dcc2580-95ed-4ec2-a43f-9e3eeae7d122	string	string	string	1687	40611	string	53321	8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	{8dcc9380-12ed-4ec2-a43f-9e3eeae7d688,8dcc2280-95ed-4ec2-a43f-9e3eeae7d688}	260000	wait_for_confirm	\N	58999	251599	67400	46000	21400		1665811044976er3oqzg37S	f	f
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, created_at, updated_at, name, description, weight, width, height, length, price, avatar, discount, active, quantity) FROM stdin;
8dcc9380-95ed-4ec2-a43f-9e3eeae7d612	2022-09-21 13:45:21.426+00	2022-09-21 13:45:21.426+00	san pham 2	qweqweqw	1000	10	5	20	50000	default.png	10	t	10
8dcc9380-95ed-4ec2-a43f-9e3eeae7d695	2022-09-21 13:45:21.426+00	2022-09-21 13:45:21.426+00	san pham 1	qweqweqw	5	4	5	10	25000	default.png	0	t	20
8dcc9380-95ed-4ec2-a43f-9e3eeae7d688	2022-09-21 13:45:21.426+00	2022-09-21 13:45:21.426+00	san pham 5	qweqweqw	300	6	5	14	100000	default.png	20	t	40
8dcc9380-12ed-4ec2-a43f-9e3eeae7d688	2022-09-21 13:45:21.426+00	2022-09-21 13:45:21.426+00	san pham 3	qweqweqw	700	5	3	10	30000	default.png	10	t	16
8dcc2280-95ed-4ec2-a43f-9e3eeae7d688	2022-09-21 13:45:21.426+00	2022-09-21 13:45:21.426+00	san pham 4	qweqweqw	500	4	4	13	100000	default.png	20	t	36
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reviews (id, created_at, updated_at, order_id, customer_id, product_ids, content, rating, is_deleted) FROM stdin;
2366ce54-6ef4-4430-bf80-e7eb05cf3c1b	2022-10-22 07:51:08.726+00	2022-10-22 07:51:08.726+00	1694f3c6-8b8a-4a8b-9c2a-89a1e63344f5	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,8dcc9380-95ed-4ec2-a43f-9e3eeae7d695}	trung luonw	4	f
d973af86-2732-44ec-9bca-ce8cebc78845	2022-10-22 08:20:08.062+00	2022-10-22 08:20:08.062+00	bafa282a-7b3b-4ca7-a252-7f2381489d67	8dcc9380-95ed-4ec2-a43f-9e3eeae7d698	{8dcc9380-95ed-4ec2-a43f-9e3eeae7d612,NULL}	trung luonw	4	f
\.


--
-- Data for Name: vouchers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vouchers (id, created_at, updated_at, name, description, code, discount_percent, discount_value, quantity, is_active, is_delete) FROM stdin;
8dcc9380-95ed-4ec2-a43f-9e3eeae7d600	2022-10-08 14:51:25.455+00	2022-10-08 14:51:25.455+00	Sale sập sàn	Giảm đến 10 %	0112233	10	0	89	t	t
\.


--
-- Name: products PK_0806c755e0aca124e67c0cf6d7d; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);


--
-- Name: reviews PK_231ae565c273ee700b283f15c1d; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY (id);


--
-- Name: accounts PK_5a7a02c20412299d198e097a8fe; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY (id);


--
-- Name: orders PK_710e2d4957aa5878dfe94e4ac2f; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY (id);


--
-- Name: order_and_products PK_a4cc6acce14d6ca47497e1428e4; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_and_products
    ADD CONSTRAINT "PK_a4cc6acce14d6ca47497e1428e4" PRIMARY KEY (id);


--
-- Name: vouchers PK_ed1b7dd909a696560763acdbc04; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT "PK_ed1b7dd909a696560763acdbc04" PRIMARY KEY (id);


--
-- Name: IDX_130a6ed45cea6a6be29cda7764; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_130a6ed45cea6a6be29cda7764" ON public.order_and_products USING btree (order_id);


--
-- Name: IDX_e4b0ed40bdd0f318108612c285; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_e4b0ed40bdd0f318108612c285" ON public.reviews USING btree (order_id);


--
-- Name: order_and_products FK_130a6ed45cea6a6be29cda77646; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_and_products
    ADD CONSTRAINT "FK_130a6ed45cea6a6be29cda77646" FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: orders FK_33f20db82908f7685a5c0c58ac6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_33f20db82908f7685a5c0c58ac6" FOREIGN KEY (shop_id) REFERENCES public.accounts(id);


--
-- Name: orders FK_3478da368b5a2f4b7690f44f711; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_3478da368b5a2f4b7690f44f711" FOREIGN KEY (voucher_id) REFERENCES public.vouchers(id);


--
-- Name: order_and_products FK_4808068a2f785e75b9fac509c0a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_and_products
    ADD CONSTRAINT "FK_4808068a2f785e75b9fac509c0a" FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: reviews FK_4dd42f48aa60ad8c0d5d5c4ea5b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_4dd42f48aa60ad8c0d5d5c4ea5b" FOREIGN KEY (customer_id) REFERENCES public.accounts(id);


--
-- Name: orders FK_772d0ce0473ac2ccfa26060dbe9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY (customer_id) REFERENCES public.accounts(id);


--
-- Name: reviews FK_e4b0ed40bdd0f318108612c2851; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_e4b0ed40bdd0f318108612c2851" FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- PostgreSQL database dump complete
--

