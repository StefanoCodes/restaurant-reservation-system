// import { db } from "@/db/db";
// import {
//   marketingTemplatesTable,
//   headerContentTable,
//   featuresContentTable,
//   featureItemsTable,
// } from "./schema";
// import { marketingConfig } from "@/app/(marketing)/marketing.config"; // Your existing config
// import { eq } from "drizzle-orm";
// import { uuid } from "drizzle-orm/pg-core";

// async function seed() {
//   const [template] = await db.select().from(marketingTemplatesTable).limit(1);

//   if (!template) {
//     throw new Error("No marketing template found in the database");
//   }
//   try {
//     // Seed header content
//     await db.insert(headerContentTable).values({
//       templateId: template.id,
//       headline: marketingConfig.Header.title,
//       subheadline: marketingConfig.Header.description,
//       primaryButtonText: marketingConfig.Header.primaryCta.label,
//       primaryButtonUrl: marketingConfig.Header.primaryCta.href,
//       secondaryButtonText: marketingConfig.Header.secondaryCta.label,
//       secondaryButtonUrl: marketingConfig.Header.secondaryCta.href,
//       heroImages: marketingConfig.Header.images,
//     });

//     // Seed features content
//     const [featuresSection] = await db
//       .insert(featuresContentTable)
//       .values({
//         templateId: template.id,
//         sectionTitle: marketingConfig.Features.title,
//         sectionSubtitle: marketingConfig.Features.highlightedText,
//       })
//       .returning();

//     // Seed individual features
//     await Promise.all(
//       marketingConfig.Features.cards.map((feature, index) =>
//         db.insert(featureItemsTable).values({
//           id: uuid().defaultRandom().toString(),
//           featuresContentId: featuresSection.id,
//           title: feature.title,
//           description: feature.description,
//           iconUrl: feature.icon.toString(),
//           sortOrder: index,
//         }),
//       ),
//     );

//     console.log("✅ Seed data inserted successfully");
//   } catch (error) {
//     console.error("❌ Error seeding data:", error);
//     throw error;
//   }
// }

// // Run the seed function
// seed().catch((err) => {
//   console.error("Failed to seed the database:", err);
//   process.exit(1);
// });
