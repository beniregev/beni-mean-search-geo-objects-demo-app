# MongoDB + Express.js + Angular 17 + Node.js (MEAN) Demo Application

Application to search Geographic objects by 4 types: Zones, Sites, Placemarks, Layers, and ofcouse, all types.

Note: Then data in this application is lower than mock, it's trivial: 

- Zones, Zone 1, Zone 2,...
- Sites, Site 1, Site 2,...
- Placemarks, Placemarks 1, Placemarks 2,...
- Layers, Layer 1, Layer 2, ...

- Developer: Beni Regev

## Prerequisites, Requirements, and More

### Requirements

- **Server-Side:** Node.js
- **Client-Side:** Angular 17 (the preferred version)
- **Database:** MongoDB Atlas (free cloud-based MongoDB)
- **IDE:** VS Code
- **Version Control (VCS):** Git
- **VCS Repository:** GitHub
  - **Repository Name:**
  - **Repository Access:** public

### Additional Packages and Dependencies

#### Server-Side

- **_Express.js_** for Node.js API calls.
- **_cors_** To override the default security that comes with Express.js and disables requests coming from different domains or ports. **NOT TO BE DEPLOYED IN PRODUCTION**.
- **_axios_** To make external API calls.
- **_multer_** To read the request form data.
- **_mongodb_** MongoDB client.
- **_dotenv_** To get environment variable from `.env` file(s).

#### Client-Side

Not Yet

## Answering The Questions (common/obvious Q&A)

### Plugins/Extensions

#### Plugins

No plugins

#### Extensions

- Angular Essentials extension for VS Code
- Angular 17 Snippets

### Multi-Lingual Support

Using Angular 2+ then using **_Angular/localized_** package that gives us the tools to localized the application.

Need to do some changed to the _angular.json_ file:

In the `projects` need to add the project source (original) `Locale`, which locales to support, and where the translation files are located (_i18n_ is the common shot for "Internationalization"):

For example: "he-IL" is the locale for Hebrew in Israel, and then the where the translation files are located.

    "projects": {
        "client-angular17": {
            "i18n": {
                "sourceLocale": "en-US",
                locales": { "he-IL": "src/locale/messages.he.xlf"}
            }
        }
    }

In the `architect` will tell Angular which locale to build when it's time to localize the application.

    "architect": {
        "build": {
            "builder": ....
            "options": {
                "localize": [ "he-IL" ],
                ...
            }
        }
    }

Adding this property also allows to preview a specific locale with `ngcert`. We can't preview multiple locales at the same time with `ngcert`, so adding multiple locales to the array or setting the property value to `true` will lead to an error when running the application with the **dev** server.

Application configuration is done.

Got over the application looking for **OTI**s (OTI = Opportunity To Internationalize). In the application where can we find **OTI**s? All the texts that are displayed and help the user understand what to do, and work with the application.

For example: the "Search" text, the "Categories" text and the categories option in the DropDown, the value of the properties "type", subtype, object-type, object-name, connectionStatus, etc. Not to forget the alternative (`alt`) text in the images, if image is missing the user can see that.

Next, in the `app.component.html` need to add the `i18n` attribute to all relevant tags: `<h1..6>`, `<tr>`, `<td>`, etc. Developers can use the basic form of the attribute or add more metadata details like customized IDs, and context for translation (t9n).

Take advantage of the `i18n` attribute to mark the `alt` text of the images for translation.

  <img alt="some icon" i18n-alt class="..." src="../assets/..." />

Use the `$localize` to mark the page title for translation in the component class `app.component.ts`.

If we are handling all aspects of I18N then, dates and currencies should also be addressed - use pipes (|) for dates and currency marked for translation. for example: `{{"12/16/2023 | date"}}` for dates and `{{123.45 | currency}}` for currency. Both support locale-specific formatting by default.

I think that's all.

### Handling Data Formats

The **_Zero-Rule_** say that the application must support the standard format.

If the server sends data in a different format (e.g., PascalCase while the application uses another case format), then the best practice, as well as KISS and WORM principles instruct to create a unidirectional or bi-directional mapping between the formats.

The standard must be retain, someone else might use the application data, and breaking the standard in not an option.

If someone or something breaks the standard, then it does not give permission for anyone else to do so. That's bad practice.

On this topic, I have seen an API that returns HTTP Status code 200 (OK) as response for every request. If there was an error then the text in the `message` property/field of the body/payload would start with **`ERROR:`**. We create a middle-tier (layer) for "mapping" and return to our application the correct response according to the correct standard.

### Flowchart

In the **root** folder of the application. File name is "**_Beni-mean-search-geo-objects-demo-app.drawio_**".

### Mock data

The answer depends on an important question: _How accurate we want the MOCK data to be? and do we want to use real names/types?_

The simplest option is to have a few text file (plain-text, XML, JSON, etc.) with sample/mock data that I will use to create different combinations to create mock data. Populating the collection with the mock data in advance, or when the server starts at the latest.
For example:

- Have files like: _zones.json_, _types.json_, _subtypes.json_, _objects.json_.
- Have an array of the valid connection statuses (`""` -> no status):

  const statuses = ["stable", "unstable", "disconnected", ""];

- Population process:

  - Read the files.
  - Iterate on each file in nested loops to create the combinations for mock data:

    ```
    for (var i=0; i < zones.length ; i++) {
        for (var j=0; j < types.length ; j++) {
            for (var k=0; k < subtypes.length ; k++) {
                for (var m=0; m < zones.length ; m++) {
                    for (var n=0; n < zones.length ; n++) {
                        Set `status` by randomly select one of the 4 statuses, if "" then no need to add the field.
                        The new document is: `zones[i]`, `types[j]`, `subtypes[k]`, `object[m]`, `objectTypes[n]`, and if `statuses[randomIndex]` !== "" then add the field connectionStatus with data `statuses[randomIndex]`.
                    }
                }
            }
        }
    }
    ```

Sites, Placemarks, and Layers mock data can be generated in a similar way.

A sequential, nested iterating will ensure unique combinations.

This way if there are 3 records/line in each file will allow to generate 243 unique combinations of _Zone -> Type -> Subtype -> Object -> ObjectType_ mock data rows. 5 rows will give 3125 combinations, 10 rows in each file will give 10_000 combination.

- Memory wise there's no problem to hold 50 (10 \* 5) elements.
- Performance wise: The nested iterating should take about 10 seconds.
- Runtime of a few seconds, even a minute or two in case of larger files is nothing.
- Yes, I have used this technique several times in the past to create massive quantity of mock data (Terabytes, Petabytes and more).

Another option is using external API (e.g., `jsonplaceholder`, etc.), or use a tool/library that gives diverse data in a variety of categories, fields, and topics (I used `javafaker` in the past).

These options can be also use to create the files I referred to in the first option.
