HUGO := hugo
ASSETS_DIR := assets/js/

build-js:
	mkdir -p $(ASSETS_DIR)
	cp node_modules/jquery/dist/jquery.slim.js $(ASSETS_DIR)
	cp node_modules/bootstrap/dist/js/bootstrap.bundle.js $(ASSETS_DIR)

build: build-js
	$(HUGO)

serve: build-js
	$(HUGO) server --buildFuture --gc

generate-githubpages:
	rm -fr docs && HUGO_ENV=production $(HUGO) --baseURL https://marcanuy.github.io/hugo-pipes-bootstrap/ && mv public docs && touch docs/.nojekyll
