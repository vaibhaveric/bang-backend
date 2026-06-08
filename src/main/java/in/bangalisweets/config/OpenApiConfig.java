package in.bangalisweets.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    private static final String BEARER_SCHEME = "bearerAuth";

    @Bean
    public OpenAPI bangaliSweetsOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Bangali Sweets API")
                .description("REST API for the Bangali Sweets storefront and admin dashboard. "
                    + "Public endpoints are open; customer and admin endpoints require a JWT "
                    + "(obtain one via /auth/verify-otp or /auth/admin/login, then click Authorize).")
                .version("1.0.0")
                .contact(new Contact().name("Bangali Sweets").email("vaibhav.eric@gmail.com"))
                .license(new License().name("Proprietary")))
            // Adds the JWT bearer scheme and applies it globally so the "Authorize" button works.
            .addSecurityItem(new SecurityRequirement().addList(BEARER_SCHEME))
            .components(new Components().addSecuritySchemes(BEARER_SCHEME,
                new SecurityScheme()
                    .name(BEARER_SCHEME)
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT")));
    }
}
