// details about the request body and response schema are as follows:
// - request body:
//   - content-type: application/json
//   - schema:
//     - type: object
//     - properties:
//       - name:
//           type: string
//           description: name of the user
//           example: John Doe
//       - age:
//           type: integer
//           description: age of the user
//           example: 26
// - response schema:
//   - type: object
//   - properties:
//     - message:
//         type: string
//         description: message from the server
//         example: Hello John Doe, you are 26 years old
//     - timestamp:
//         type: string
//         description: timestamp of the response
//         example: 2020-01-01T00:00:00.000Z
//     - status:
//         type: integer
//         description: status code of the response
//         example: 200
//     - data:
//         type: object
//         description: data from the server
//         properties:
//           - name:
//               type: string
//               description: name of the user
//               example: John Doe
//           - age:
//               type: integer
//               description: age of the user
//               example: 26
// - response headers:
//   - content-type: application/json
//   - x-custom-header: custom header value
// - response cookies:
//   - name: cookie-name
//     value: cookie-value
//     description: cookie description
//     expires: 2020-01-01T00:00:00.000Z
//     max-age: 3600
//     domain: example.com
//     path: /
//     secure: true
//     http-only: true
//     same-site: strict
// - response examples:
//   - name: example-1
//     summary: example summary
//     description: example description
//     value:
//       message: Hello John Doe, you are 26 years old
//       timestamp: 2020-01-01T00:00:00.000Z
//       status: 200
//       data:
//         name: John Doe
//         age: 26
//   - name: example-2
//     summary: example summary
//     description: example description
//     value:
//       message: Hello John Doe, you are 26 years old
//       timestamp: 2020-01-01T00:00:00.000Z
//       status: 200
//       data:
//         name: John Doe
//         age: 26
// - response links:
//   - name: link-1
//     description: link description
//     url: https://example.com
//     operation-ref: #/paths/~1users/get
//     operation-id: get-users
//     parameters:
//       - name: parameter-1
//         value: parameter-value-1
//         description: parameter description
//       - name: parameter-2
//         value: parameter-value-2
//         description: parameter description
//   - name: link-2
//     description: link description
//     url: https://example.com
//     operation-ref: #/paths/~1users/get
//     operation-id: get-users
//     parameters:
//       - name: parameter-1
//         value: parameter-value-1
//         description: parameter description
//       - name: parameter-2
//         value: parameter-value-2
//         description: parameter description
// - response callbacks:
//   - name: callback-1
//     description: callback description
//     url: https://example.com
//     operation-ref: #/paths/~1users/get
//     operation-id: get-users
//     parameters:
//       - name: parameter-1
//         value: parameter-value-1
//         description: parameter description
//       - name: parameter-2
//         value: parameter-value-2
//         description: parameter description
//   - name: callback-2
//     description: callback description
//     url: https://example.com
//     operation-ref: #/paths/~1users/get
//     operation-id: get-users
//     parameters:
//       - name: parameter-1
//         value: parameter-value-1
//         description: parameter description
//       - name: parameter-2
//         value: parameter-value-2
//         description: parameter description
// - response security:
//   - name: security-1
//     scopes:
//       - scope-1
//       - scope-2
//   - name: security-2
//     scopes:
//       - scope-1
//       - scope-2
// - response tags:
//   - tag-1
//   - tag-2
// - response extensions:
//   - name: x-extension-1
    
