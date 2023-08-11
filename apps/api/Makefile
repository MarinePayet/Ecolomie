SHELL := /bin/bash

updateDatabase:
	symfony console d:s:u -f
	symfony console d:f:l -n
	symfony php -d memory_limit=-1 bin/console app:import-products 

.PHONY: updateDatabase