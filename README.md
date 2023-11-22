# Liberary

This description is not quite correct.

This project is educational in the development of web interfaces.
This is a virtual library, the goal is to automatically from the PDF folder in accordance with its subject and file name, give a link to this file for downloading or reading.

I use nginx as a server, we can consider its initial configuration below:
```
user www-data;
worker_processes auto;
pid /run/nginx.pid;

include /etc/nginx/modules-enabled/*.conf;

events {

	# worker_connections 768;
	# multi_accept on;
}

http {
	limit_conn_zone $binary_remote_addr zone=perip:50m;
	limit_conn_zone $server_name zone=perserver:10m;
	limit_req_zone $binary_remote_addr zone=dynamic:50m rate=5r/s;
	
	sendfile on;
	tcp_nopush on;
	types_hash_max_size 2048;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;


	# include /etc/nginx/conf.d/*.conf;
	# include /etc/nginx/sites-enabled/*;

	##
	# Virtual Host Configs
	##

	server {
		listen 10.197.0.99:8580;

		limit_conn perip 50;
		limit_conn perserver 100;

		# listen 443 ssl default_server;
		# listen [::]:443 ssl default_server;
	
		root /var/www/html/liberary;
	}
}
```

Of course, I will not upload PDF files to github, as this violates copyrights, and it is impractical to put binary files in git.
