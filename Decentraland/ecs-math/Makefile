
ifneq ($(CI), true)
LOCAL_ARG = --local --verbose --diagnostics
endif

lint:
	node_modules/.bin/eslint . --ext .ts

lint-fix:
	node_modules/.bin/eslint . --ext .ts --fix

test:
	node_modules/.bin/jest --detectOpenHandles --colors --runInBand --coverage $(TESTARGS)

test-watch:
	node_modules/.bin/jest --detectOpenHandles --colors --runInBand --watch $(TESTARGS)

build:
	./node_modules/.bin/tsc -p tsconfig.json
	rm -rf node_modules/@microsoft/api-extractor/node_modules/typescript || true
	./node_modules/.bin/api-extractor run $(LOCAL_ARG) --typescript-compiler-folder ./node_modules/typescript

watch:
	./node_modules/.bin/tsc -p tsconfig.json -w

.PHONY: build test
