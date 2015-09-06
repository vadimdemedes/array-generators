SRC = index.js

default:
	@echo "No default task"

test:
	@./node_modules/.bin/mocha

include node_modules/make-lint/index.mk
