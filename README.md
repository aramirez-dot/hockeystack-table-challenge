Final table found at: http://localhost:3000/

Initial HTML table implementation found at: http://localhost:3000/plain-table

For styling this project I used what comes standard with a create-next-app template, which is Tailwind. One of the advantages that I really like about Tailwind is the ability to use system-specific classes to apply styling depending on the user's theme preference.

### Light mode

<img width="1281" alt="Screenshot 2024-08-19 at 4 57 22 p m" src="https://github.com/user-attachments/assets/12faf600-4512-4ed4-b760-bd24d4a458a8">

### Dark mode

<img width="1281" alt="Screenshot 2024-08-19 at 4 57 11 p m" src="https://github.com/user-attachments/assets/a10de30f-d65e-4395-bd8c-46c45661745c">

## Project Debrief

### Areas for improvement

- Client-side pagination and sorting might not be the best for datasets this large, I would have added query parameters for pagination and sorting on the API endpoint.

- Content-shifting is not pleasant to watch, I would definitely spend a bit more time fixing it, one option would be to add a "size" property to the column definition and use a 12 or 16 column system to have fixed column widths.

### Trade-offs

- Initially wanted to fix the content-shifting by using the "table-fixed" class from Tailwind but that caused the URL column to be extremely cramped, tried setting text overflow to ellipsis but I would also need to add tooltips to discover the whole URL on hover which would have taken a bit more time.
