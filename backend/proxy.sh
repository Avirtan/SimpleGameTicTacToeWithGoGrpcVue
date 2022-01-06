sudo /media/avirtan/4ffee513-0f7b-4676-ac6e-eedec3ef6720/go1.17.4.linux-amd64/go/bin/./grpcwebproxy --backend_addr=localhost:30000 \
--run_tls_server=true \
--allow_all_origins=true \
--server_http_debug_port=30001 \
--server_tls_cert_file=/etc/nginx/ssl/domain.crt \
--server_tls_key_file=/etc/nginx/ssl/domain.key \
--server_http_max_write_timeout=1h \
