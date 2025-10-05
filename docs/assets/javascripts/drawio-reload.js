// https://github.com/tuunit/mkdocs-drawio
document$.subscribe(({ body }) => {
  GraphViewer.processElements()
})