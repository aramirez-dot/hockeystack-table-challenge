## Project Debrief

### Areas for improvement

- Client-side pagination and sorting might not be the best for datasets this large, I would have added query parameters for pagination and sorting on the API endpoint.

- Content-shifting is not pleasant to watch, I would definitely spend a bit more time fixing it, one option would be to add a "size" property to the column definition and use a 12 or 16 column system to have fixed column widths.

### Trade-offs

- Initially wanted to fix the content-shifting by using the "table-fixed" class from Tailwind but that caused the URL column to be extremely cramped, tried setting text overflow to ellipsis but I would also need to add tooltips to discover the whole URL on hover which would have taken a bit more time.
