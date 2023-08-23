--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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
-- Name: greetings_schema; Type: SCHEMA; Schema: -; Owner: greetings_postgresql_8b6y_user
--

CREATE SCHEMA greetings_schema;


ALTER SCHEMA greetings_schema OWNER TO greetings_postgresql_8b6y_user;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: greetings_postgresql_8b6y_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO greetings_postgresql_8b6y_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: greetings_schema; Owner: greetings_postgresql_8b6y_user
--

CREATE TABLE greetings_schema.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    language character varying(255) NOT NULL,
    timesgreeted integer DEFAULT 0
);


ALTER TABLE greetings_schema.users OWNER TO greetings_postgresql_8b6y_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: greetings_schema; Owner: greetings_postgresql_8b6y_user
--

CREATE SEQUENCE greetings_schema.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE greetings_schema.users_id_seq OWNER TO greetings_postgresql_8b6y_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: greetings_schema; Owner: greetings_postgresql_8b6y_user
--

ALTER SEQUENCE greetings_schema.users_id_seq OWNED BY greetings_schema.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: greetings_schema; Owner: greetings_postgresql_8b6y_user
--

ALTER TABLE ONLY greetings_schema.users ALTER COLUMN id SET DEFAULT nextval('greetings_schema.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: greetings_schema; Owner: greetings_postgresql_8b6y_user
--

COPY greetings_schema.users (id, name, language, timesgreeted) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: greetings_schema; Owner: greetings_postgresql_8b6y_user
--

SELECT pg_catalog.setval('greetings_schema.users_id_seq', 1, false);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: greetings_schema; Owner: greetings_postgresql_8b6y_user
--

ALTER TABLE ONLY greetings_schema.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO greetings_postgresql_8b6y_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO greetings_postgresql_8b6y_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO greetings_postgresql_8b6y_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO greetings_postgresql_8b6y_user;


--
-- PostgreSQL database dump complete
--

