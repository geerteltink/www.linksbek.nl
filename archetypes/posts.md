---
title: "{{ .TranslationBaseName | replaceRE "^[0-9]{4}-[0-9]{2}-[0-9]{2}-" "" | replaceRE "-" " " | title }}"
date: "{{ now.Format "2006-01-02" }}"
draft: false
---
