INSERT INTO profiles (name, img_url, title, about, linkedin_url, github_url, personal_url, endorsements, endorsed_people, linkedin_id, username, password)
VALUES ('Janice West', 
'https://randomuser.me/api/portraits/women/91.jpg',
'Software Developer', 
'Hello my name is Janice and I am an aspiring software developer', 
'https://www.linkedin.com/in/janicewest/',
'https://github.com/janicewest',
'http://janicewest.com/', 0, "", 1,
'janicewest', 'janicewest'
);
INSERT INTO skills (front_html, front_css, front_javascript, front_ajax, front_jquery, front_bootstrap, front_react, front_angular, 
	back_mysql, back_node, back_php, back_express, back_mongodb, back_java, back_python, back_c_sharp, 
	design_photoshop, design_gimp, design_illustrator, design_inkscape, design_coreldraw, design_adobe_indesign, profileId)
VALUES (true, true, true, false, true, true, false, false,
	true, true, false, true, false, true, true, false, 
	false, false, false, false, false, false, 1);

INSERT INTO projects (name, img_url, description, profileId)
VALUES ('Mobile phone app', '', 'IOS mobile phone app', 1);

INSERT INTO profiles (name, img_url, title, about, linkedin_url, github_url, personal_url, endorsements, endorsed_people, linkedin_id, username, password)
VALUES ('Jackson Hughes', 
'https://randomuser.me/api/portraits/men/92.jpg',
'Fullstack Developer', 
'Hello my name is Jackson and I am an aspiring fullstack developer', 
'https://www.linkedin.com/in/jacksonhughes/',
'https://github.com/jacksonhughes',
'http://jacksonhughes.com/', 0, "", 2,
'jacksonhughes', 'jacksonhughes'
);

INSERT INTO skills (front_html, front_css, front_javascript, front_ajax, front_jquery, front_bootstrap, front_react, front_angular, 
	back_mysql, back_node, back_php, back_express, back_mongodb, back_java, back_python, back_c_sharp, 
	design_photoshop, design_gimp, design_illustrator, design_inkscape, design_coreldraw, design_adobe_indesign, profileId)
VALUES (true, true, true, false, true, true, false, false, 
	false, false, false, false, false, false, 
	true, true, true, true, true, true, true, true, 2);

INSERT INTO projects (name, img_url, description, profileId)
VALUES ('Bamazon', '', 'Bamazon web site', 2);

INSERT INTO profiles (name, img_url, title, about, linkedin_url, github_url, personal_url, endorsements, endorsed_people, linkedin_id, username, password)
VALUES ('Theodore Wright', 
'https://randomuser.me/api/portraits/men/95.jpg',
'Backend Developer', 
'Hello my name is Theodore and I am an aspiring backend developer', 
'https://www.linkedin.com/in/theodorewright/',
'https://github.com/theodorewright',
'http://theodorewright.com/', 0, "", 3,
'theodorewright', 'theodorewright'
);

INSERT INTO skills (front_html, front_css, front_javascript, front_ajax, front_jquery, front_bootstrap, front_react, front_angular, 
	back_mysql, back_node, back_php, back_express, back_mongodb, back_java, back_python, back_c_sharp, 
	design_photoshop, design_gimp, design_illustrator, design_inkscape, design_coreldraw, design_adobe_indesign, profileId)
VALUES (false, false, true, false, false, false, false, false, 
	false, false, false, false, false, false, 
	true, true, true, true, true, true, true, true, 3);

INSERT INTO projects (name, img_url, description, profileId)
VALUES ('Email server', '', 'Mail.com email server', 3);

INSERT INTO profiles (name, img_url, title, about, linkedin_url, github_url, personal_url, endorsements, endorsed_people, linkedin_id, username, password)
VALUES ('Melody Nguyen', 
'https://randomuser.me/api/portraits/women/8.jpg',
'Frontend Developer', 
'Hello my name is Melody and I am an aspiring frontend developer', 
'https://www.linkedin.com/in/melodynguyen/',
'https://github.com/melodynguyen',
'http://melodynguyen.com/', 0, "", 4,
'melodynguyen', 'melodynguyen'
);

INSERT INTO skills (front_html, front_css, front_javascript, front_ajax, front_jquery, front_bootstrap, front_react, front_angular, 
	back_mysql, back_node, back_php, back_express, back_mongodb, back_java, back_python, back_c_sharp, 
	design_photoshop, design_gimp, design_illustrator, design_inkscape, design_coreldraw, design_adobe_indesign, profileId)
VALUES (true, true, true, true, true, true, true, true,
	false, false, false, false, false, false, false, false,
	false, false, false, false, false, false, 4);

INSERT INTO projects (name, img_url, description, profileId)
VALUES ('Hearts', '', 'Hearts card game web site', 4);

INSERT INTO profiles (name, img_url, title, about, linkedin_url, github_url, personal_url, endorsements, endorsed_people, linkedin_id, username, password)
VALUES ('Laura Christensen', 
'https://randomuser.me/api/portraits/women/44.jpg',
'Web Developer', 
'Hello my name is Laura and I am an aspiring web developer', 
'https://www.linkedin.com/in/laurachristensen/',
'https://github.com/laurachristensen',
'http://laurachristensen.com/', 0, "", 5,
'laurachristensen','laurachristensen'
);

INSERT INTO skills (front_html, front_css, front_javascript, front_ajax, front_jquery, front_bootstrap, front_react, front_angular, 
	back_mysql, back_node, back_php, back_express, back_mongodb, back_java, back_python, back_c_sharp, 
	design_photoshop, design_gimp, design_illustrator, design_inkscape, design_coreldraw, design_adobe_indesign, profileId)
VALUES (true, true, true, true, true, true, true, true,
	false, false, false, false, false, false, false, false,
	false, false, false, false, false, false, 5);

INSERT INTO projects (name, img_url, description, profileId)
VALUES ('Company web site', '', 'Hi-Tech web site', 5);
