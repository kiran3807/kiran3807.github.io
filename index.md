---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
---

<ul class="date-list" >
    {% for page in site.pages %}
    {% assign tag = page.tags | split : ' ' | first %}
      {% if tag == 'nonPost' %}
      <li>
        <h2>
          <a href="{{ page.url | relative_url }}">{{ page.title | escape }}</a>
        </h2>
      </li>
      {% endif %}
    {% endfor %}
    <hr/>
    {% for post in site.posts %}
      <li>
        {% assign date_format = "%b %-d, %Y" %}
        <span id="date">{{ post.date | date: date_format  }}</span>
        <h2>
          <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
        </h2>
      </li>
    {% endfor %}
  </ul>

