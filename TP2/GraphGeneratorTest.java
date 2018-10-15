package Tests;

import edu.princeton.cs.algs4.Graph;
import edu.princeton.cs.algs4.GraphGenerator;

import static org.junit.jupiter.api.Assertions.*;

class GraphGeneratorTest {
    @org.junit.jupiter.api.BeforeEach
    void setUp() {
    }

    @org.junit.jupiter.api.AfterEach
    void tearDown() {
    }

    @org.junit.jupiter.api.Test
    /*
    simple() prend 2 entrées: V et E
    V peut avoir n'importe quel int positif ou nul
    E doit valoir entre 0 et V*(V-1)/2
    On a donc pour V: min-(-1), min(0), V(1 à 2147483647)
    pour E: min-(-1), min(0), E(1 à (V*(V-1)/2-1)), max(V*(V-1)/2), max+(1+(V*(V-1)/2))
    Nous avons donc 6 cas de test : V1, E1, V2E2, V3E3, V3E4, E5
    */
    void simpleVE() {
        //V1
        Throwable negativeVertex = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(-1, 0);
        });
        //E1
        Throwable negativeEdge = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(0, -1);
        });
        //V2E2
        assertEquals(GraphGenerator.simple(0,0).V(), 0);
        assertEquals(GraphGenerator.simple(0,0).E(), 0);
        //V3E3
        assertEquals(GraphGenerator.simple(25,30).V(), 25);
        assertEquals(GraphGenerator.simple(25,30).E(), 30);
        //V3E4
        assertEquals(GraphGenerator.simple(12,66).V(), 12);
        assertEquals(GraphGenerator.simple(12,66).E(), 66);
        //E5
        Throwable tooManyEdges = assertThrows(IllegalArgumentException.class,() -> {
            GraphGenerator.simple(5, 11);
        });
    }

    @org.junit.jupiter.api.Test
    /*
    simple() prend 2 entrées: V et E
    V peut avoir n'importe quel int positif ou nul
    E doit valoir entre 0 et V*(V-1)/2
    On a donc pour V: min-(-1), min(0), V(1 à 2147483647)
    pour E: min-(-1), min(0), E(1 à (V*(V-1)/2-1)), max(V*(V-1)/2), max+(1+(V*(V-1)/2))
    Nous avons donc 6 cas de test : V1, E1, V2E2, V3E3, V3E4, E5
    */
    void simpleVp() {

    }

    @org.junit.jupiter.api.Test
    void bipartite() {
    }

    @org.junit.jupiter.api.Test
    void bipartite1() {
    }

    @org.junit.jupiter.api.Test
    void regular() {
    }

}