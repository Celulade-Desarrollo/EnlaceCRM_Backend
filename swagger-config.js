import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EnlaceCRM API",
      version: "1.0.0",
      description: "Documentación generada con Swagger para EnlaceCRM Backend",
    },
  },
  apis: ["./routes/*.js"], // Rutas donde están tus endpoints anotados
};

const swaggerSpec = swaggerJsDoc(options);

export default function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
