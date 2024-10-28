# Nginx
[尚硅谷Nginx教程](https://www.bilibili.com/video/BV1yS4y1N76R/?spm_id_from=333.337.search-card.all.click)
[Web服务器/反向代理/负载均衡](https://www.bilibili.com/video/BV1TZ421b7SD/?spm_id_from=333.337.search-card.all.click&vd_source=78435c3cefd4783245d9d16d09d19859)
Nginx 是一个高性能的 Web 服务器和反向代理服务器，广泛用于反向代理、负载均衡、静态文件服务等。以下是 Nginx 的常用操作总结：

### 1. 反向代理
反向代理用于将客户端请求转发到后端服务器，隐藏后端服务器的 IP 地址。

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
此配置将请求转发到 `backend_server`（可以是 IP 或主机名）。

### 2. 负载均衡
Nginx 可以将请求分发到多个服务器，支持多种负载均衡算法：

- **轮询（默认）**：依次将请求分发到每台服务器。
- **权重**：通过设置权重分配请求频率。
- **IP 哈希**：将相同客户端 IP 的请求分发到同一服务器。

示例：
```nginx
upstream backend {
    server backend1.example.com weight=3;
    server backend2.example.com;
    server backend3.example.com;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```

### 3. 静态文件服务
Nginx 可以直接处理静态文件请求，不需要转发给后端服务器。

```nginx
server {
    listen 80;
    server_name example.com;

    location /static/ {
        alias /path/to/static/files/;
        autoindex on; # 显示目录列表
    }
}
```

### 4. 缓存配置
通过 Nginx 反向代理缓存，可以加快页面响应速度，减少后端服务器压力。

```nginx
proxy_cache_path /data/nginx/cache levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=60m;
server {
    location / {
        proxy_cache my_cache;
        proxy_pass http://backend_server;
        proxy_cache_valid 200 1h;
    }
}
```

### 5. SSL 配置
Nginx 支持 HTTPS，通常用于安全传输。

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://backend_server;
    }
}
```

### 6. 动静分离
将动态请求转发给后端服务器，静态请求由 Nginx 直接处理。

```nginx
server {
    location /static/ {
        alias /path/to/static/files/;
    }

    location / {
        proxy_pass http://backend_server;
    }
}
```

### 7. 限制请求速率
Nginx 可以控制每个 IP 的请求速率，用于防止 DDoS 攻击。

```nginx
http {
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

    server {
        location / {
            limit_req zone=mylimit burst=20 nodelay;
            proxy_pass http://backend_server;
        }
    }
}
```

### 8. 重定向和重写
Nginx 可以用于 URL 重定向和重写。

- **重定向**：将所有 `http` 请求重定向到 `https`。
    ```nginx
    server {
        listen 80;
        server_name example.com;
        return 301 https://$server_name$request_uri;
    }
    ```

- **URL 重写**：将请求 URL 重写为另一种格式。
    ```nginx
    server {
        location /old-path {
            rewrite ^/old-path(.*)$ /new-path$1 permanent;
        }
    }
    ```

### 9. 访问控制
可以使用 `allow` 和 `deny` 指令限制 IP 访问。

```nginx
location / {
    allow 192.168.1.0/24;
    deny all;
}
```

以上为 Nginx 的常用操作，可以根据具体需求进行配置调整。