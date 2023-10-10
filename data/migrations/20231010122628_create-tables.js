/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("tarifler", tbl =>{
      tbl.increments("tarif_id")
      tbl.string("tarif_adi").notNullable()
      tbl.timestamp("kayit_tarihi").defaultTo(knex.fn.now())
    })
    .createTable("adimlar", tbl =>{
      tbl.increments("adim_id")
      tbl.integer("adim_sirasi").notNullable()
      tbl.string("adim_talimati").notNullable()
      tbl.integer("tarif_id").references("tarif_id").inTable("tarifler")
      .onDelete("CASCADE")
    })
    .createTable("malzemeler", tbl =>{
      tbl.increments("malzeme_id")
      tbl.string("malzeme_adi").notNullable()
    })
    .createTable("malzemeler_adimlar", tbl =>{
      tbl.increments("malzeme_adim_id")
      tbl.decimal("miktar").notNullable()
      tbl.integer("malzeme_id").references("malzeme_id").inTable("malzemeler")//devam
      tbl.integer("adim_id").references("adim_id").inTable("adimlar")//buralara bak
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('malzemeler_adimlar')
      .dropTableIfExists('malzemeler')
      .dropTableIfExists('adimlar')
      .dropTableIfExists('tarifler')
  };