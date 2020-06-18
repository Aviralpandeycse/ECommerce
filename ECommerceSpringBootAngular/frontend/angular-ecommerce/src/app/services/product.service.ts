import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

	private baseUrl='http://localhost:8080/api/products';
	private categoryUrl="http://localhost:8080/api/product-category";

 	constructor(private httpClient: HttpClient) { }

  	getProduct(theProductId: number):Observable<Product>{
  		const prodUrl=`${this.baseUrl}/${theProductId}`;
  		return this.httpClient.get<Product>(prodUrl);
  	}

  	getProductListPagenate( thePage: number,
  							thePageSize:number,
  							theCategoryId: number): Observable<GetResponseProducts>{
  		// Url based on category id, page and size
  		const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
  						+`&page=${thePage}&size=${thePageSize}`;
  		
  		return this.httpClient.get<GetResponseProducts>(searchUrl);	
  		
  	}

  	getProductList(theCategoryId: number): Observable<Product[]>{

  		const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
  		
  		return this.getProducts(searchUrl);	
  		
  	}

  	searchProducts(theKeyword:string):Observable<Product[]>{

  		const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
  		
  		return this.getProducts(searchUrl);	
  	}

  	searchProductsPagenate( thePage: number,
  							thePageSize:number,
  							theKeyword: string): Observable<GetResponseProducts>{
  		// Url based on category id, page and size
  		const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
  						+`&page=${thePage}&size=${thePageSize}`;
  		
  		return this.httpClient.get<GetResponseProducts>(searchUrl);	
  		
  	}

  	private getProducts(searchUrl:string): Observable<Product[]> {
  		return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
  			map(response => response._embedded.products)
  		);
  	}

    getProductCategories(): Observable<ProductCategory[]>{
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
      );
    }
}

interface GetResponseProducts{
	_embedded:{
		products:Product[];
	},
	page:{
		size:number,
		totalElements:number;
		totalPages:number;
		number:number;
	}
}

interface GetResponseProductCategory{
  	_embedded:{
  		productCategory:ProductCategory[];
  	}
}
