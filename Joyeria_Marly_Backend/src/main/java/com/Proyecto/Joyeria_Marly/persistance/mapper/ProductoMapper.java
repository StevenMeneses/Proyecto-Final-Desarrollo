package com.Proyecto.Joyeria_Marly.persistance.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import com.Proyecto.Joyeria_Marly.domain.dto.Product;
import com.Proyecto.Joyeria_Marly.persistance.entity.Productos;

@Mapper(componentModel = "spring", uses = {CategoriaMapper.class})
public interface ProductoMapper {
    
    @Mappings({
        @Mapping(source = "idProducto", target = "productId"),
        @Mapping(source = "nombreProducto", target = "name"),
        @Mapping(source = "descripcion", target = "description"),
        @Mapping(source = "precio", target = "price"),
        @Mapping(source = "stock", target = "stock"),
        @Mapping(source = "imagenUrl", target = "imageUrl"),
        @Mapping(source = "categoria.idCategoria", target = "categoryId"),
        @Mapping(source = "categoria.nombreCategoria", target = "categoryName")
    })
    Product toProduct(Productos productos);
    
    @InheritInverseConfiguration
    @Mapping(target = "categoria", ignore = true)
    Productos toProductos(Product product);
}
