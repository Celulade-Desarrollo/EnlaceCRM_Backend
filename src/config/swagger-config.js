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
 apis: ["src/interfaces/routes/*.js", "src/interfaces/controllers/*.js"], // ✅ Ruta corregida
};

const swaggerSpec = swaggerJsDoc(options);

export default function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
