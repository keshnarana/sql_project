CREATE DATABASE `uq8bk0tpdf7znmbr` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

CREATE TABLE `accounting` (
  `trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_id` int(11) NOT NULL,
  `remit_num` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `notes` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `customer` (
  `cust_id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `cust_addr1` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `cust_addr2` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cust_zip` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `cust_phone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `cust_type` int(11) NOT NULL,
  `cust_username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `cust_passwd` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `cust_email` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `cust_yelpID` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `cust_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_id` int(11) NOT NULL,
  `upc_code` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `upc_code` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `product_name` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  `wholsale_cost` decimal(10,2) DEFAULT NULL,
  `retail_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=322 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
