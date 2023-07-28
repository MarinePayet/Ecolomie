SHELL := /bin/bash

updateDatabase:
	symfony console d:f:l -n
	symfony console app:import-product

.PHONY: updateDatabase