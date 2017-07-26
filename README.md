Demo chat application built over nodejs.
Clients wishing to use this service will send their messages to the node server which will encrypt these messages and queue them at a RabbitMQ message broker for any interested consumers (logging/analytics/reporting/etc).
The node server stores its user info at a mongo database.

![alt text](https://raw.githubusercontent.com/asarnaout/elitechat/master/infrastructure.png)

Authored by: Ahmed Shirin