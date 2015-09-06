SRC = index.js

default:
	@echo "No default task"

test:
	@node test

include node_modules/make-lint/index.mk
